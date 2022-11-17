const Appointment = require("../ModelsControllers/AppointmentModels");
const Rate = require("../ModelsControllers/RateModels");
const RealState = require("../ModelsControllers/RealStateModels");
const Request = require("../ModelsControllers/RequestModels");
const User = require("../ModelsControllers/UserModels");
const { CatchAsync } = require("../Utils/CatchAsync");
const fs = require('fs')

exports.CreateUserInAdminPannel=CatchAsync(async(req, res)=>{

    const body = req.body;
    // console.log(req.body)
    const findByNumber = await User.findOne({PhoneNumber: body.PhoneNumber});
    // console.log(findByNumber)
    if(findByNumber){
        res.status(200).json({error:"این شماره قبلا ثبت شده است"});
                throw('این شماره قبلا ثبت شده است')
    }
    
    await User.create(req.body);

    fs.existsSync(`public/UnAuthenticatedUser/${req.body.PhoneNumber}.json`) && fs.unlinkSync(`public/UnAuthenticatedUser/${req.body.PhoneNumber}.json`);

    res.status(200).json({
        status: 'success'
    })

})

exports.GetUnSeenRequests =CatchAsync(async (req, res)=>{

        const getNewReqs = (await Request.find({Status:'unseen'})).length
        const getNewAppointments =  (await Appointment.find({Accept:'unseen'})).length 
        const getNewComments = (await Rate.find({Accept: 'not'})).length
        const getNewUserRealState = (await RealState.find({Show:'unseen'})).length

        res.status(200).json({
            status: 'success',
            newReqs: getNewReqs,
            newAppointments: getNewAppointments,
            NewComments : getNewComments,
            newUserRealState: getNewUserRealState
        })
})

exports.ChangeStatusRequest = CatchAsync(async (req, res)=>{

        const ObjectFunc ={
            Request:  Request.updateMany({Status: 'unseen'},{'$set': {Status:'Pending'}}),
            Appointment :  Appointment.updateMany({Accept: 'unseen'}, {"$set": {Accept: 'Pending'}}),
            UserRealState : RealState.updateMany({Show: 'unseen'},{"$set":{Sowe: "pending"}})
        }

        const query = req.params.select;
        const selectFunc = await ObjectFunc[query]

        res.status(200).json({
            status: 'success'
        })
})