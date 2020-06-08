const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let config = require('config')
const mongoose = require('mongoose')

const Users = mongoose.model('Users')

passport.serializeUser((user, cb)=>
{
  console.log(user.id)
  cb(null, user.id)
})

passport.deserializeUser((id,cb)=>{
  Users.findById(id).then(user=>{
    cb(null,user)
  });
});


passport.use(new GoogleStrategy({
    clientID: config.get('googleOauth.GOOGLE_CLIENT_ID'),
    clientSecret: config.get('googleOauth.GOOGLE_CLIENT_SECRET'),
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb)=> { 
    const user = Users.findOne({googleID:profile.id})
    .then((existingUser)=>
    {
      if(existingUser){
        cb(null, existingUser)
      }else{
        new Users({googleID:profile.id})
        .save()
        .then(user=>cb(null, user) )
      }
    })
    if(!user)
    new Users({googleID:profile.id}).save();
  }
));