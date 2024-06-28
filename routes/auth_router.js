const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "None",
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, name: req.user.displayName, email: req.user.email },
      process.env.SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/");
  });
});

module.exports = router;
