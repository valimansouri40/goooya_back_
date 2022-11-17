
const express = require('express');
const { GetUnSeenRequests, ChangeStatusRequest, CreateUserInAdminPannel  } = require('../Controllers/adminControllers');
const { Protected, ResterictTo } = require('../Controllers/AuthControllers');


const router = express.Router()


router.use( Protected, ResterictTo('admin','employee'))
router.route('/notification').get( GetUnSeenRequests)
router.route('/notification/:select').patch( ChangeStatusRequest)
router.route('/createuserinadminpannel').post( CreateUserInAdminPannel)

module.exports = router;