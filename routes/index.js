var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/validator', function(req, res, next) {
  res.render('validation');
});

router.post('/validator',[
    check('pancard').matches('^[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$').withMessage('Upercase start with alphabet must be 10 charchters').isLength({min : 10, max : 10}).withMessage('must be 10 charcheters'),
    check('uidcard').matches('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$').withMessage('must be 12 digits require'),
    check('passport').matches('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$').withMessage('Passport number not valid'),
    check('mobile').matches('(0|91)?[7-9][0-9]{9}').withMessage('mobile number is invalide'),
    check('gst').matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}').withMessage('Invalide Gst Number please check before enter'),  
    check('email').matches('[a-zA-Z0-9+_.-]+@[a-zA-z0-9.-]').withMessage('Invalide email id'),
    check('password').matches('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&-+=()])(?=\\S+$).{8, 20}').withMessage('password is invalid')
    ],function(req, res, next){
      const errors = validationResult(req).mapped();
      console.log(errors);
      if(errors){
        res.render('validation',{errors : errors})
      }else{
        console.log('Login Successfull');
      }
    })
module.exports = router;
 