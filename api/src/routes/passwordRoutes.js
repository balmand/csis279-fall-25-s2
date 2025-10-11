import express from 'express';
import {
  forgetPassword,
  resetPassword,
  checkResetToken,
} from '../controllers/PasswordController.js';

export const passwordRoutes = express.Router();

// password reset routes

// POST /api/password/forget
// when user clicks forget password button
// expects: { email: "user@example.com" }
// returns: success message regardless of email existence
passwordRoutes.post('/forget', forgetPassword);

// POST /api/password/reset
// when user submits new password form
// expects: { token: "reset_token_from_email", newPassword: "new_password123" }
// returns: success or error message
passwordRoutes.post('/reset', resetPassword);

// GET /api/password/check/:token
// validates reset token before showing password form
// expects: token as url parameter
// returns: { valid: true/false, email: "user@example.com" }
passwordRoutes.get('/check/:token', checkResetToken);
