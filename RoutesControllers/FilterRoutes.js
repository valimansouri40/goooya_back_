const express= require('express');

const Filter= require('../Controllers/FilterControllers');

const router= express.Router();


router.route('/sell').get(Filter.GetFilter);
router.route('/rh').get(Filter.GetFilterrh);

module.exports= router;

