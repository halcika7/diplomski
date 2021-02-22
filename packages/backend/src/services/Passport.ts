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
import { JWTService } from './JWT';
import { Injectable } from '@decorator/class';
import { Token } from '@job/common';
import { RedisService } from './Redis';

@Injectable()
export class PassportService extends BaseService {
  private readonly jwt = JWTService;

  private readonly redis = RedisService;

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

      if (user?.blocked) return done(new Error('User blocked!'));

      if (!user && !userAdded) {
        return done('You ddo not have permission tto Sign In', undefined);
      }

      if (userAdded) {
        userAdded.googleID = profile.id;
        userAdded.name = profile.displayName;
        userAdded.picture = profile._json.picture;
        await userAdded.save();
        return done(undefined, userAdded);
      }

      return done(undefined, user as UserInterface);
    } catch {
      return done(
        'Please enable sharing personal info such as "email, name an picture"',
        undefined
      );
    }
  }

  private async passportCallback(
    err: Error | undefined,
    { _id, role, createdAt }: UserInterface,
    res: Response
  ) {
    const { url } = Configuration.appConfig;

    if (err) return res.redirect(`${url}/?err=${err}`);

    const tokenObj = {
      id: _id,
      role,
      year: new Date(createdAt).getFullYear(),
    } as Token;

    const accessToken = this.jwt.signToken(tokenObj);

    const refresh = this.jwt.signToken(tokenObj, true);

    const valid = this.redis.setValue(_id.toString(), refresh);

    if (!valid) {
      return res.redirect(`${url}/?err="Login failed"`);
    }

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
