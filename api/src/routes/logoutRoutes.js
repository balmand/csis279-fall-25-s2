import {Router} from 'express'
import session from 'express-session';

export const logoutRoutes = Router();
logoutRoutes.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});
