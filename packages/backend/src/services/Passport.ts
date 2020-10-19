import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from 'passport-google-oauth20';
import { BaseService } from './Base';
import { Configuration } from '@env';
import { Response, Request } from 'express';
import User from '@model/User';
import { UserInterface } from '@model/User/User';
import { CookieService } from './Cookie';
import { JWTService } from './JWT';
import { Injectable } from '@decorator/class';

@Injectable()
export class PassportService extends BaseService {
  private readonly cookie = CookieService;

  private readonly jwt = JWTService;

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  socialCallback(req: Request, res: Response) {
    return passport.authenticate(
      'google',
      { session: false, failureRedirect: '/', successRedirect: '/' },
      (err, user, _) => this.passportCallback(err, user, res)
    )(req, res);
  }

  static async passportStrategy(profile: GoogleProfile, done: VerifyCallback) {
    try {
      const user = await User.findOne({ googleID: profile.id });
      if (user?.blocked) {
        return done(new Error('User blocked!'));
      }
      if (!user) {
        const newUser = await new User({
          googleID: profile.id,
          name: profile.displayName,
          picture: profile._json.picture,
          email: profile._json.email,
          role: 'professor',
          facebookLink: '',
          twitterLink: '',
          blocked: false,
        }).save();
        return done(undefined, newUser);
      }
      return done(undefined, user);
    } catch (error) {
      return done(error.message, null);
    }
  }

  private async passportCallback(
    err: Error | undefined,
    { _id, role }: UserInterface,
    res: Response
  ) {
    const { url } = Configuration.appConfig;
    if (err) return res.redirect(`${url}/?err=${err}`);

    const accessToken = this.jwt.signToken({ id: _id, role });
    this.cookie.setRefreshToken(
      res,
      this.jwt.signToken({ id: _id, role }, true)
    );

    return res.redirect(`${url}/?token=${accessToken}`);
  }
}

passport.serializeUser((user: UserInterface, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Configuration.appConfig.social.googleID,
      clientSecret: Configuration.appConfig.social.googleSecretID,
      callbackURL: Configuration.appConfig.social.googleCallBack,
    },
    (_, __, profile, done) => PassportService.passportStrategy(profile, done)
  )
);

export default passport;
