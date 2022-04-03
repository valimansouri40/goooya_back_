const Request = require("../ModelsControllers/RequestModels");
const ApiFeacher = require("../Utils/ApiFeacher");
const { CatchAsync } = require("../Utils/CatchAsync");


exports.GetAllMyRequest=CatchAsync(async(req,res)=>{
     req.query.Objid =  req.user._id;
    console.log(req.query)
        const requ=  new ApiFeacher(Request.find(),req.query).paginate().filter().sort();
        console.log('vali mansouri')
        const data=await requ.data;
        // const data= await Request.find({Objid: req.user._id})
        const length= await Request.find()
        // console.log(data[0])
        res.status(200).json({
            status: 'succes',
            data: data,
            length: length
        })
})