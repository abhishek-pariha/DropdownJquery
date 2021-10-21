const express = require('express');
const router = express.Router();

const {body, validationResult, matchedData} = require('express-validator');

//Schemas
const UserModel = require('../model/user');
const countryModel = require('../model/country');
const stateModel = require('../model/state');
const cityModel = require('../model/city');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',function(req, res, next){
  res.render('signupform');
})

//Api for User Registration form 
router.post('/signup',[
  body('username','min 5 max 20').notEmpty().withMessage('user not empty').trim().escape().isLength({min : 5, max : 20}).withMessage('8 charecter require'),
  body('email').matches('^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$').withMessage('Email is not valid').isEmail().withMessage('Email Required').trim()
  .custom((value ,{req}) => {
    return new Promise(async (resolve, reject) => {
      UserModel.findOne({email : req.body.email},function(err, user){
        if(err){
          reject(new Error('Server Error'))
        }
        if(Boolean(user)){
          reject(new Error('E-mail already in use'))
        }
        resolve(true)
      })
    })
  }),
  body('password').matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})').withMessage('Password cotain 8 charchter'),
  ],function(req, res, next){
    const errors = validationResult(req).mapped();
    console.log('errors');
    console.log(errors);
    console.log('yahatak chala')
    if(Object.keys(errors).length){
      console.log('yaha aaya')
      console.log("req.body if wala");
      const postData  = req.body
      console.log(req.body);
      res.render('signupform',{myerrors : errors,data : postData.username, email : postData.email, password : postData.password})
    }else{

      console.log('req.body else wala');
      console.log(req.body);
      const mybodydata = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
      }
      const data = UserModel(mybodydata);
      data.save(function(err,data){
        if(err){
          console.log('Error in data save'+err);
        }else
          var filePath = 'public/uplad/filename' 
            console.log('Successfully data stored in database'+data);
            res.redirect('/users/signup')
      })
    }
  })

//Api for User Login Form
router.get('/login',function(req, res, next){
  res.render('login')
})

router.post('/login',[
  body('email').matches('^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$').withMessage('Email is not valid').isEmail().withMessage('Email Required').trim(),
  body('password').matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})').withMessage('Password cotain 8 charchter'),
  ],
  function(req, res, next){
    console.log('function chala');
    const errors = validationResult(req).mapped();
    if(Object.keys(errors).length){
      console.log('if chala')
      res.render('login',{myerrors : errors,email : req.body.email, password : req.body.password})
    }else{
      console.log('else chala');
      const email = req.body.email,
       password = req.body.password
      UserModel.findOne({'user_email' : email},function(err, data){
        console.log('find one'+data);
        if(data){
          var db_email = data.email;
          var db_password = data.password;  
        }if(db_email == null){
          console.log('if');
          res.end('email not found')
        }else if(db_email == email && db_password == password){
          req.session.email = db_email;
          console.log('login hua');
          res.send('Login Successfull')
        }else{
          console.log('else login invalid');
          res.end('Login Invalid')
        }
      }).lean()
    }
})

//Api for Dropdown Country 
router.get('/country',function(req, res, next){
  res.render('country');
})

router.post('/country',function(req, res, next){
  const postData = req.body;
  console.log(postData)
  const myBodyData = {
    country : postData.country,
  }
  var data = countryModel(myBodyData);
  data.save(function(err,data){
    if(err){
      console.log('Error in post'+err);
    }else{
      console.log('Successfully Stored'+data);
      res.redirect('/users/country')
    }
  })
})

//Api for State
router.get('/state',function(req, res, next){
  countryModel.find(function(err, data){
      if(err){
          console.log("error in add");
      }else{
          console.log("data fetch successfully"+data);
          res.render('state',{mydata : data});
      }
  }).lean();
})

router.post('/state',function(req, res, next){
  console.log(req.body);
  const mybodydata = {
      state : req.body.state,
      country : req.body.country
  }
  console.log("Name is "  + req.body.state);
  console.log("ID is "  + req.body.country);
 
  
  var data = stateModel(mybodydata);
  data.save(function(err, data){
      if(err){
          console.log('Error in adding data'+err);
      }else{
          console.log("Successfully save"+data);
          res.redirect('/users/state');
      }
  })
})

//Api for City
router.get('/city', function(req, res, next){
  stateModel.find(function(err,state_data){
      if(err){
          console.log("City not fetch"+err);
      }else{
          countryModel.find(function(err,country_data){
              if(err){
                  console.log("state not fetch"+err);
              }else{
                  console.log("Successfully fetch data");
                  res.render('city',{mycity : state_data,mystate : country_data});
              }
          }).lean();
      }
  }).lean();
  
})

router.post('/city',function(req, res, next){
  console.log(req.body);
  const mybodydata = {
      city : req.body.city,
      state : req.body.state,
      country : req.body.country
  }
  console.log("Name is "  + req.body.city);
  console.log("ID is "  + req.body.state);
  console.log("City Cat is "  + req.body.country);
  
  var data = cityModel(mybodydata);
  data.save(function(err, data){
      if(err){
          console.log('Error in adding data'+err);
      }else{
          console.log("Successfully save"+data);
          res.redirect('/users/city');
      }
  })
})

//Api for Dropdown
router.get('/dropdown', function(req, res, next){
  cityModel.find(function(err,city_data){
    if(err){
      console.log(('Error in city'+err));
    }else{
     stateModel.find(function(err,state_data){
          if(err){
              console.log("City not fetch"+err);
          }else{
              countryModel.find(function(err,country_data){
                  if(err){
                      console.log("state not fetch"+err);
                  }else{
                      console.log("Successfully fetch data");
                      res.render('dropdown',{mycity : city_data ,mystate : state_data,mycountry : country_data});
                  }
              }).lean();
          }
      }).lean();
    }
  })

})

router.post('/city',function(req, res, next){
  console.log(req.body);
  const mybodydata = {
      city : req.body.city,
      state : req.body.state,
      country : req.body.country
  }
  console.log("Name is "  + req.body.city);
  console.log("ID is "  + req.body.state);
  console.log("City Cat is "  + req.body.country);
  
  var data = cityModel(mybodydata);
  data.save(function(err, data){
      if(err){
          console.log('Error in adding data'+err);
      }else{
          console.log("Successfully save"+data);
          res.redirect('/users/city');
      }
  })
})
module.exports = router;
