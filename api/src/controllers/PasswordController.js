import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { pool } from '../config/db.js';

// this handles forget password functionality
// stores reset tokens in memory since we cant modify the database structure

const resetTokens = new Map();

// email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// handles when user requests password reset
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    // check if customer exists
    const result = await pool.query(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // always return same message for security
      return res.json({
        message: 'if your email is registered you will receive a reset link',
      });
    }

    // generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // expires in 15 minutes

    // store token in memory
    resetTokens.set(resetToken, {
      email: email,
      expiresAt: expiresAt,
    });

    // log token for testing purposes
    console.log('------- PASSWORD RESET TOKEN GENERATED -------');
    console.log('email:', email);
    console.log('token:', resetToken);
    console.log('expires at:', new Date(expiresAt));
    console.log(
      'reset url:',
      `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    );
    console.log('tokens in memory:', resetTokens.size);
    console.log('----------------------------------------------');

    // send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'reset your password',
      html: `
                <h3>password reset request</h3>
                <p>someone requested a password reset for your account</p>
                <p>click the link below to reset your password</p>
                <a href="${resetUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">reset password</a>
                
                <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
                    <p><strong>for manual testing:</strong></p>
                    <p>token: <code style="background: #e9ecef; padding: 2px 4px; border-radius: 3px;">${resetToken}</code></p>
                    <p>copy this token to test the reset form manually</p>
                </div>
                
                <p>this link expires in 15 minutes</p>
                <p>if you did not request this please ignore this email</p>
            `,
    });

    res.json({
      message: 'if your email is registered you will receive a reset link',
    });
  } catch (error) {
    console.error('forget password error:', error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

// handles when user submits new password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: 'token and new password are required' });
    }

    // validate token
    const tokenData = resetTokens.get(token);
    if (!tokenData) {
      return res.status(400).json({ message: 'invalid or expired token' });
    }

    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(token);
      return res.status(400).json({ message: 'token has expired' });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password in database
    await pool.query('UPDATE customers SET password = $1 WHERE email = $2', [
      hashedPassword,
      tokenData.email,
    ]);

    // remove the used token
    resetTokens.delete(token);

    res.json({ message: 'password reset successful' });
  } catch (error) {
    console.error('reset password error:', error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

// checks if reset token is valid
export const checkResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const tokenData = resetTokens.get(token);
    if (!tokenData) {
      return res.status(400).json({ valid: false, message: 'invalid token' });
    }

    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(token);
      return res
        .status(400)
        .json({ valid: false, message: 'token has expired' });
    }

    res.json({ valid: true, email: tokenData.email });
  } catch (error) {
    console.error('check token error:', error);
    res.status(500).json({ message: 'something went wrong' });
  }
};
