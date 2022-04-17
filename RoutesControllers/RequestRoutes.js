const express= require('express');
const Auth= require('../Controllers/AuthControllers');
const Req= require('../Controllers/RequestHandller');

const router= express.Router();

router.use(Auth.Protected);

router.route('/getallrequest').get(Req.GetAllMyRequest);
router.route('/:id').delete(Req.RequestDeleteOne);
router.use(Auth.ResterictTo('admin', 'employee'));
router.route('/allrequest').get(Req.GetAllRequest)
router.route('/:id').patch(Req.UpdateRequest);
module.exports= router;