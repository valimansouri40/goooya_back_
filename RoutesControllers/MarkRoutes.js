const express= require('express');

const Mark= require('../Controllers/MarkControllers');
const Auth = require('../Controllers/AuthControllers');



const router= express.Router();

router.use(Auth.Protected);
router.route('/').get(Mark.GetAllRealStateAndMark).post(Mark.AddMark);
router.route('/:id').delete(Mark.LessMark).get(Mark.GetAllMyMark);
// router.route('/').get(Mark.GetAllMyMark2)

module.exports = router;