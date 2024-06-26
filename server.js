require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const errorHandler = require("./middlewares/error_handler");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
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

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173");
  });
});

app.use(express.json());

app.use(spoonacularRouter);
app.use(apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
