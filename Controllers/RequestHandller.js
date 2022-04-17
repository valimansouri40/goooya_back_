const Request = require("../ModelsControllers/RequestModels");
const ApiFeacher = require("../Utils/ApiFeacher");
const { CatchAsync } = require("../Utils/CatchAsync");
const { DeleteOneData} = require('./FactoryControllers');


exports.GetAllMyRequest=CatchAsync(async(req,res)=>{
   
        const requ=  new ApiFeacher(Request.find({Objid: req.user._id}),req.query).paginate().filter().sort();
        const data=await requ.data;
         
        const length= req.user._id
        
        res.status(200).json({
            status: 'succes',
            data: data,
            length: length
        })
});


exports.GetAllRequest= CatchAsync(async(req, res, next)=>{

    const modelfeacher= new ApiFeacher( Request.find(), req.query).paginate().sort().filter();
    const model = await modelfeacher.data;
        
    const ln =  new ApiFeacher( Request.find(), req.query).filterandlength()
    const lengthall=( await ln.data).length;

    res.status(200).json({
        status: 'success',
        data: model,
        length: lengthall
       });
})

exports.UpdateRequest= CatchAsync(async (req, res)=>{
    const param= req.params.id;
    
     await Request.findByIdAndUpdate(param, req.body);
    
    res.status(200).json({
        status:'success',
        
    })
});

exports.RequestDeleteOne= DeleteOneData(Request);