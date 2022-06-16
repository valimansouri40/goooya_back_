const express = require('express');
const Auth = require('../Controllers/AuthControllers');
const RateAd = require('../Controllers/RateAdvisorControllers');


const route = express.Router();

route.post('/', Auth.Protected, RateAd.RateAdvisorPostRate);
route.get('/getbestof', RateAd.GetBestOfAdvisor);

module.exports = route;