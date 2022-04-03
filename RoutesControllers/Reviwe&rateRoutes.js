const express= require('express');

const Router= express.Router();
const Auth= require('../Controllers/AuthControllers');
const reviwe= require('../Controllers/Reviwe&RateControllers');

Router.route('/:id').get(reviwe.ReviweGet);

Router.route('/:id').post(Auth.Protected, reviwe.ReviwePostsAddData, reviwe.ReviwePosts);

// Router.route('/rate/:id').get(reviwe.ReviweGet);


module.exports = Router;

