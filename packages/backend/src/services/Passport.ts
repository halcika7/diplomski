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
      const [user, userAdded] = await Promise.all([
        User.findOne({ googleID: profile.id }),
        User.findOne({ email: profile._json.email, googleID: 'google' }),
      ]);

      if (user?.blocked) {
        return done(new Error('User blocked!'));
      }

      if (!user && !userAdded) {
        const newUser = await new User({
          googleID: profile.id,
          name: profile.displayName,
          picture: profile._json.picture,
          email: profile._json.email,
          role: 'professor',
        }).save();
        return done(undefined, newUser);
      }

      if (userAdded) {
        userAdded.googleID = profile.id;
        userAdded.name = profile.displayName;
        userAdded.picture = profile._json.picture;
        await userAdded.save();
        return done(undefined, userAdded);
      }

      return done(undefined, user as UserInterface);
    } catch (error) {
      return done(error.message, undefined);
    }
  }

  private async passportCallback(
    err: Error | undefined,
    { _id, role, createdAt }: UserInterface,
    res: Response
  ) {
    const { url } = Configuration.appConfig;

    if (err) return res.redirect(`${url}/?err=${err}`);

    const accessToken = this.jwt.signToken({
      id: _id,
      role,
      year: new Date(createdAt).getFullYear(),
    });
    this.cookie.setRefreshToken(
      res,
      this.jwt.signToken(
        { id: _id, role, year: new Date(createdAt).getFullYear() },
        true
      )
    );

    return res.redirect(`${url}/?token=${accessToken}`);
  }
}

passport.serializeUser((user: any, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user as UserInterface);
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
