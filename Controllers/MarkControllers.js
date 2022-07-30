const Mark = require("../ModelsControllers/MarkModels");
const RealState = require("../ModelsControllers/RealStateModels");
const ApiFeacher = require("../Utils/ApiFeacher");
const { CatchAsync } = require("../Utils/CatchAsync");
const fs = require('fs');
const { LikeRealState } = require("./FactoryControllers");

exports.GetAllRealStateAndMark=  CatchAsync(async (req, res,next)=>{
    let model

    const modelfeacher= new ApiFeacher( RealState.find(), req.query).filter().sort().paginate();
       model = await modelfeacher.data;
    //    console.log(model[0],'mark', req.query,model.length === 1 && req.query.length === 'notexist'&& model[0]?.RealStateNumber === req.query._id * 1)

    if( model.length === 1 && model[0]?.RealStateNumber === req.query._id   && req.query.length === 'notexist'){
           model = await LikeRealState(req, RealState);
      
       }
       
        model = model.filter(er=>er.RealStateNumber !== (req.query._id ))
        
       
        
    await Promise.all(  model.map(async(mp, i)=>{
        // let imageCu = fs.existsSync(`public/img/${mp.Image[0]}`)?fs.readFileSync(`public/img/${mp.Image[0]}`,'base64'):null
            
        //     model[i].Image = [imageCu];
            const Markfinding= await Mark.findOne({RealStateId: mp._id, UserId: req.user._id });
             if(Markfinding){
                 model[i].Mark  = true;
             }

      }))
      
    res.status(200).json({
        status:'success',
        data: model
    })
});

exports.AddMark=CatchAsync(async (req, res)=>{

    req.body.UserId = req.user._id;

        await Mark.create(req.body);

        res.status(200).json({
            status:'success',
        })  
});

exports.GetAllMyMark=CatchAsync(async(req, res)=>{

    const userid = req.user._id;
    
    const querymark = new ApiFeacher( Mark.find({ UserId: userid }), req.query).sort().paginate();
   let mark= await querymark.data;
    
//    console.log(mark[0])
    // mark.map((mp,i)=>{
    //     let imageCu = fs.existsSync(`public/img/${mp.RealStateId.Image[0]}`)?fs.readFileSync(`public/img/${mp.RealStateId.Image[0]}`,'base64'):''
        
    //    mark[i].RealStateId.Image = [imageCu];

    // }) 
    const ln =  new ApiFeacher( Mark.find({ UserId: userid }), req.query).filterandlength()
    const lengthall=( await ln.data).length;
        
    res.status(200).json({
        status:'success',
        data: mark,
        length:lengthall
    }) 
})




exports.LessMark=CatchAsync(async (req, res)=>{
    const userid = req.user._id;
    const param = req.params.id;

     await Mark.deleteOne({RealStateId: param, UserId: userid});

    res.status(200).json({
        status:'success',
    }) 
})