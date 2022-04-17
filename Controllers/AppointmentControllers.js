const Appointment = require("../ModelsControllers/AppointmentModels");
const { CatchAsync } = require("../Utils/CatchAsync");
const { PostData, GetLimitData, UpdateData, DeleteOneData } = require("./FactoryControllers");


exports.ApponintmentPost= PostData(Appointment);

exports.ApponintmentGet= GetLimitData(Appointment);

exports.ApponintmentGetOne= CatchAsync(async (req, res)=>{

            const param = req.params.id;
            
            const appointment = await Appointment.findOne({RealStateId: param,UserId: req.user._id});

            res.status(200).json({
                status:'success',
                data: appointment
            })
})

exports.ApponintmentUpdate= UpdateData(Appointment);
exports.ApponintmentDeleteOne= DeleteOneData(Appointment);