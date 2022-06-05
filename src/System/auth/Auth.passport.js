var express  = require('express')
  , session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy

module.exports =
  function(app) {
    passport.serializeUser(function(user, done) {
     done(null, user);
   });
    passport.deserializeUser(function(obj, done) {
     done(null, obj);
   });
   var scopes = ["identify"]
   const strategy = new Strategy({
     clientID: process.env.id,
     clientSecret: process.env.secret,
     callbackURL: process.env.url,
     scope: scopes,
     prompt: "none"
     }, function(accessToken, refreshToken, profile, done) {
       process.nextTick(function() {
        return done(null, profile);
       });
     })

     passport.use(strategy);

     app.use(session({
      secret: "burbur stinks",
      resave: false,
      saveUninitialized: false
     }));

     app.use(passport.initialize());
     app.use(passport.session());
     app.get("/auth/callback", passport.authenticate('discord', { failureRedirect: '/' }), (req,res) => {
        res.redirect("/");
      });

      app.get("/auth/login", passport.authenticate('discord', { scope: scopes, prompt: "none" }), (req,res) => {
  
       })
   }