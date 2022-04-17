const express= require('express');

const Router= express.Router();
const Auth= require('../Controllers/AuthControllers');
const reviwe= require('../Controllers/Reviwe&RateControllers');


Router.route('/get').get(reviwe.ReviweGet);


Router.route('/').post( Auth.Protected, reviwe.ReviwePosts);
Router.route('/:id').patch(Auth.Protected ,Auth.ResterictTo('admin', 'employee', 'advisor'), reviwe.ReviewPatch).delete(Auth.Protected , 
    reviwe.Reviewdl)
// Router.route('/rate/:id').get(reviwe.ReviweGet);


module.exports = Router;

