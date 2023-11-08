// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/User");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async (email, password, done) => {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return done(null, false, { message: "Not user found" });
//       } else {
//         const match = await user.matchPassword(password);
//         if (match) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: "Incorrect Password" });
//         }
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err, null);
//     });
// });

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = "DSJFHSDGFIYGW8GIODEHFIUSGDYUSGFIUDSIGIDGUYFGDYGFIUDSHFIUDGFYA";
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Not user found" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          const token = jwt.sign({ id: user.id, email: user.email }, secret, {
            expiresIn: "1h",
          });
          return done(null, user, { token: token });
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
