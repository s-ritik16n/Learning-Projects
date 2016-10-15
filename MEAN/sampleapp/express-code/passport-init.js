var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Users = mongoose.model("User");
var Posts = mongoose.model("Post");

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user._id);
        //return the unique id for the user
        done(null, user._id);
    });

    //Desieralize user will call with the unique id provided by serializeuser
    passport.deserializeUser(function(id, done) {

        Users.fineById(id,function(err,user){
          if(err){
            return done(err);
          }
          if(!user){
            return done("user not found",false);
          }
          return done(user,true);
        })
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            Users.findOne({username: username},function(err,user){
              if(err){
                return done(err,false);
              }
              if(!user){
                return done("user not found",false);
              }
              return done(null,false);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            Users.findOne({username: username},function(err,user){
              if(err){
                return done(err,false);
              }
              if(user)
              return done("username already taken",false);

              var user = new Users();

              user.username = username,
              user.password : createHash(password)

              user.save(function(err,user){
                if(err){
                  return done(err);
                }
                console.log("successfully signed up : "+username);
                return done(null,user)
              })
            });
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
