const { CatchAsync } = require("../Utils/CatchAsync");
const ApiFeacher= require('../Utils/ApiFeacher');
const fs= require('fs');
const User = require("../ModelsControllers/UserModels");
const SearchQuery = require("../ModelsControllers/SearchQueryModels");
const Mark = require("../ModelsControllers/MarkModels");


exports.PostData= Model => (CatchAsync(async (req, res)=>{
    
             await Model.create(req.body);
        
            res.status(200).json({
                status:'success',

            })
}));


exports.GetOneData= Model => CatchAsync(async (req, res, next)=>{
    const param= req.params.id;
    
    const model= await Model.findById(param);
        let arrimg=[]
                model.Image.map(im=>{
                    // realstate-1648546291143-1.jpeg
                    arrimg.push(fs.readFileSync(`public/img/${im}`,'base64'))
        })
        
        model.Image= arrimg;
    res.status(201).json({
        status:'success',
        data: model
    })
});


exports.GetAllData= Model => CatchAsync(async (req, res,next)=>{
    let model
        
    const queryobj= {...req.query};
    const useerid= req.query._id;
    const araryel= ['page', 'limit', 'sort','?', '_id'];
    araryel.forEach(el=> delete queryobj[el] );
    // await Model.deleteMany()
    let queryStr = JSON.stringify(queryobj);

        
    if(queryStr.length > 2){
    await SearchQuery.create({queryObj: req.query})
    }
    const modelfeacher= new ApiFeacher( Model.find(), req.query).filter().sort().paginate();
       model = await modelfeacher.data;
       
      const ln =  new ApiFeacher( Model.find(), req.query).filterandlength()
    const lengthall=( await ln.data).length;


        await Promise.all(model.map(async(mp, i)=>{
        
            model[i].Image = [fs.readFileSync(`public/img/${mp.Image[0]}`,'base64')];
            if(useerid){
                const Markfinding= await Mark.findOne({RealStateId: mp._id, UserId: useerid });
             if(Markfinding){
                 model[i].Mark  = true;
             }
            }
      }))
      
    res.status(200).json({
        status:'success',
        data: model,
        length:lengthall
    })
});

exports.UpdateData= Model => CatchAsync(async (req, res)=>{
    const param= req.params.id;
   
    
    const model= await Model.findByIdAndUpdate(param, req.body);
    
    res.status(200).json({
        status:'success',
        data: model
    })
});



exports.DeleteOneData= Model => (CatchAsync(async (req, res)=>{
    const param= req.params.id;

    await Model.findByIdAndDelete(param);

    res.status(200).json({
        status:'success',
        
    })
}))


//navigator.clipboard.writeText(copyText.value);

// exports.CreateRequest=model=>CatchAsync(async (req, res, next)=>{
//     console.log(req.body)
//     const {PhoneNumber,FristName}= req.body;
//     if(!PhoneNumber, !FristName) throw ('error phn');
//         // await User.deleteMany()
//     let user= await User.find({PhoneNumber:PhoneNumber});
//             let token
           
//     if(user.length === 0){
//         req.body.Password ='12345678';
        
//          user= await User.create(req.body);
//          if(!user) throw('error')
//          req.body.Objid = user._id;
//          const rd= await model.create(req.body)
//          const code= await user.CreateRandomPass();
//          user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
//          user.SineupCode = code;
//          await user.save({validateBeforeSave:false})
//          console.log(code);
         
//         // SmsHandller(code, PhoneNumber);
       
//     }else{
//         req.body.Objid = user._id;
//          await model.create(req.body);
//        token= CreateToken(user._id)
       
//     }

// res.status(200).json({
//  status: 'success',
//  token: token
// });
// })




exports.GetLimitData=Model=>CatchAsync(async(req, res, next)=>{
        
    const modelfeacher= new ApiFeacher( Model.find(), req.query).paginate().sort().filter();
    const model = await modelfeacher.data;
        
    const ln =  new ApiFeacher( Model.find(), req.query).filterandlength()
    const lengthall=( await ln.data).length;
        
    res.status(200).json({
        status: 'success',
        data: model,
        length: lengthall
       });
})