const { CatchAsync } = require("../Utils/CatchAsync");
const ApiFeacher= require('../Utils/ApiFeacher');
const fs= require('fs');
const SearchQuery = require("../ModelsControllers/SearchQueryModels");
const Mark = require("../ModelsControllers/MarkModels");
const sharp = require("sharp");

exports.PostData= Model => (CatchAsync(async (req, res)=>{
    
             await Model.create(req.body);
        
            res.status(200).json({
                status:'success',

            })
}));


exports.GetOneData= Model => CatchAsync(async (req, res, next)=>{
    const param= req.params.id;
    
    const model= await Model.findById(param);
        
        // let arrimg=[]
        //         model.Image.map(im=>{
        //             // realstate-1648546291143-1.jpeg
        //             // arrimg.push(fs.existsSync(`public/img/${im}`)?fs.readFileSync(`public/img/${im}`,'base64'):null)
        //             arrimg.push(window.location.protocol + "//" + window.location.host + '/' + im)
        //             console.log(window.location.protocol + "//" + window.location.host + '/' + im)
        //         })
        // console.log(model)
        // model.Image= arrimg;

    res.status(201).json({
        status:'success',
        data: model
    })
});

exports.LikeRealState = (req, Model)=>{
    let lessQuery = {...req.query};
    const queryDeleteArr = ['Area', 'Mortgage','TypeState'];
    queryDeleteArr.forEach(mp=> delete lessQuery[mp]);
    
    const modelfeacher2= new ApiFeacher( Model.find(), lessQuery).filter().sort().paginate();
    
    return  modelfeacher2.data;
}

exports.GetAllData= Model => CatchAsync(async (req, res,next)=>{
    let model
        
    const queryobj= {...req.query};
    const useerid= req.query._id;
    const araryel= ['page', 'limit', 'sort','?', '_id'];
    araryel.forEach(el=> delete queryobj[el] );
    
    let queryStr = JSON.stringify(queryobj);

        
    if(queryStr.length > 2){
    await SearchQuery.create({queryObj: req.query})
    }
        const modelfeacher= new ApiFeacher( Model.find(), req.query).filter().sort().paginate();
            model = await modelfeacher.data;
       
        const ln =  new ApiFeacher( Model.find(), req.query).filterandlength()
        const lengthall=( await ln.data).length;

       
        if( (model.length === 1 || model.length === 0) && req.query.length === 'notexist'){
            model = await this.LikeRealState(req, Model);
        }

        


        await Promise.all(model.map(async(mp, i)=>{
            // let imageCu = fs.existsSync(`public/img/${mp.Image[0]}`)?fs.readFileSync(`public/img/${mp.Image[0]}`,'base64'):null
            // model[i].Image = [imageCu];
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

exports.CompressImageProfile = CatchAsync(async (req, res, next)=>{

        if(!req.body.Image) next();
        // const filename = `realstate-${req.user._id}-${ 1000001}.jpeg`;
        
        const fl= req.body.Image.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');
           
       await sharp(imgBuffer).jpeg({ quality: 30 })
      .resize(700, 500).toBuffer()
      .then(data => {
        req.body.Image = 'data:image/jpeg;base64,' + Buffer.from(data).toString('base64')
          
      })
      .catch(err => console.log(`downisze issue ${err}`))
    

      next()
})

exports.UpdateData= Model => CatchAsync(async (req, res)=>{
    const param= req.params.id;
   
    req.body.NoneId= null
    
    
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