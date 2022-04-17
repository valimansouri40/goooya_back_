const express= require('express');
const WorkSampel= require('../Controllers/WorkSampelControllers');
const Auth= require('../Controllers/AuthControllers');
const router= express.Router();


router.route('/').get(WorkSampel.GetImg);
router.route('/:id').delete(WorkSampel.WorkSampelDelete)
//   router.use();

 router.route('/').post(Auth.Protected, Auth.ResterictTo('admin','employee'),
 WorkSampel.SaveImg, WorkSampel.WorkSpacePost)


module.exports= router;
