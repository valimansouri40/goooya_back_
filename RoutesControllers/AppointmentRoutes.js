const express= require('express');
const Appointment= require('../Controllers/AppointmentControllers');
const Auth= require('../Controllers/AuthControllers');
const router= express.Router();



router.use(Auth.Protected);
// router.route('/:id').get()
router.route('/').post(Appointment.ApponintmentPost).get(Appointment.ApponintmentGet);
router.route('/:id').get(Appointment.ApponintmentGetOne).delete(Appointment.ApponintmentDeleteOne).patch(Auth.ResterictTo('admin','employee'),
Appointment.ApponintmentUpdate);

module.exports = router;