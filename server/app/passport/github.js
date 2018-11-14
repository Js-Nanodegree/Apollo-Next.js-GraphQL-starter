import passport from 'passport';
import User from '../models/user.model';
import GitHubStrategy from 'passport-github';

export default () => {
    passport.use(new GitHubStrategy({
            clientID: 'Iv1.d276ac6dd35b269e',
            clientSecret: 'e32d9f6fff0aff198a2f2721ae1013e6a77528b1',
            callbackURL: "/auth/github/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
        console.log({accessToken});
        console.log({refreshToken});
        console.log({profile});





            User.findOne({githubId: profile.id}, {upe}, function (err, user) {
                return cb(err, user);
            });
        }
    ));
}
