const express= require('express');
const Auth= require('../Controllers/AuthControllers');
const Req= require('../Controllers/RequestHandller');

const router= express.Router();

router.use(Auth.Protected);

router.route('/getallrequest').get(Req.GetAllMyRequest);

module.exports= router;