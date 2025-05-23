import { Request, Response, Router } from 'express';
import passport from 'passport';
import { config } from '@config/env.config';
import { login, logOut, registerUser } from '@controllers/auth.controller';

const authRouter = Router();

const failureURL = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

authRouter.post('/register', registerUser);
authRouter.post('/login', login);
authRouter.post('/logout', logOut);

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: failureURL,
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect(
      `${
        config.FRONTEND_ORIGIN
      }/workspace/${req.user?.currentWorkspace?.toString()}`
    );
  }
);

export default authRouter;
