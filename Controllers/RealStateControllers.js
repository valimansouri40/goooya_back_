const RealState= require('../ModelsControllers/RealStateModels');
const { CatchAsync } = require('../Utils/CatchAsync');
const { GetAllData, GetOneData, UpdateData } = require("./FactoryControllers");
const City = require('../ModelsControllers/CityModels');
const Area = require('../ModelsControllers/AreaModels');
const sharp= require('sharp');
// const multer= require('multer');
const fs= require('fs');
const Mark = require('../ModelsControllers/MarkModels');
const Appointment = require('../ModelsControllers/AppointmentModels');
const Rate = require('../ModelsControllers/RateModels');
// const { Citys } = require('../City&Area/city');
// const { Areas } = require('../City&Area/Areas');
// const { find } = require('../ModelsControllers/RealStateModels');
const { UniqueRandomNumber } = require('../Utils/utils');
const ApiFeacher = require('../Utils/ApiFeacher');


// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (req.body.Image) {
//     cb(null, true);}
 
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// exports.uploadTourImages = upload.fields([
//   { name: 'Image', maxCount: 5 }
// ]);
exports.unShowRealState = CatchAsync(async (req, res,next)=>{
    if(req.user.role === 'user'){
        req.body.Show = 'unseen'
    }
    next()
})

exports.DeleteImageExtra=CatchAsync(async (req, res,next)=>{
        // console.log(req.body.ListImagesDeleted.length  )
        if(req.body.AdvisorId !== 1234 || req.body.AdvisorId !== '1234'){
            req.body.NoneId = 1;
        }

        req.body.UpdateAt = Date.now()
        if(req.body.ListImagesDeleted && req.body.ListImagesDeleted.length !== 0 && req.body.ListImagesDeleted[0].startsWith(`${req.body.RealStateNumber}`)){ 
        
        // const paramm= req.params.id;

        // const realstate= await RealState.findById(paramm);
            
        req.body.ListImagesDeleted.forEach(path => fs.existsSync(`public/img/${path}`) 
        && fs.unlinkSync(`public/img/${path}`));
        next();
        }else{
        next();
    }
})

const IdHandller = (lastId)=>{
    const pers = 1 / lastId;
    const bettween = (pers + 1) * lastId;
    return Math.round(bettween)  ;
}
exports.CreateRealStateNumber=CatchAsync(async(req, res , next)=>{
    // console.log(req.body.Image)
    const fn= await RealState.find({City: req.body.City, Area: req.body.Area}).sort('-RealStateNumber')
    
    if(fn.length > 0){
    req.body.RealStateNumber = IdHandller(fn[0].RealStateNumber);
     if(fn[0].RealStateNumber === req.body.RealStateNumber){
        //  console.log('annn');
        req.body.RealStateNumber = IdHandller(fn[0].RealStateNumber) + 1;

     }
 
    }else{
    req.body.RealStateNumber = req.body.cityandareaid;
    
}

    // console.log(await RealState.find({RealStateNumber:req.body.RealStateNumber}))
   next();
});

exports.ImageHandller=CatchAsync(async (req,res,next)=>{
    // if(req.body.Image[0].endsWith(".jpeg")) {delete req.body.Image; console.log("delete")}
    if(req.body.Image ){
    console.log(req.body.RealStateNumber)
       
        const images= req.body.Image;
            
        req.body.Image = [];
        
  await Promise.all(
    images.map(async (file, i) => {
      let filename = file;
        // console.log(file)
    if(!file.endsWith('.jpeg') && !file.startsWith(`${req.body.RealStateNumber}`  )){
        const randomNumber = UniqueRandomNumber(req.body.Image);
        // console.log(randomNumber)
        filename = `${req.body.RealStateNumber}/realstate-${req.body.RealStateNumber}-${randomNumber}.jpeg`;

        const fl= file.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');

        !fs.existsSync(`public/img/${req.body.RealStateNumber}`) && fs.mkdirSync(`public/img/${req.body.RealStateNumber}`);

      await sharp(imgBuffer).jpeg({ quality: 50 })
      .resize({width:1400, height:1000}).composite([
          {
              input: 'public/goooya-logo.png',
              top: 40,
              left: 40
          }
      ])
      .toFile(`public/img/${filename}`)
      .then(data => {
          console.log('normal: ')

          
      })
      .catch(err =>{
          console.log(`downisze issue ${err}`)
        throw('can not image save')
    })
        }
      req.body.Image.push(filename);
    }))
        }
    next();
})

exports.PostRealState= CatchAsync(async (req, res, next)=>{
   
    if(['dealer','user'].includes(req.user.role)){
        req.body.NoneId= 1234
        
        delete req.body.AdvisorId
    }else{
        delete req.body.NoneId

    }
   
    // delete req.body.Area;
    const gh= await RealState.create(req.body).catch(er=>{
        req.body.Image.map(el=>fs.existsSync('public/img/'+el)&&fs.unlinkSync('public/img/'+el));
        throw('انجام نشد')
    });
    // console.log(gh)

        res.status(200).json({
            status:'success',
        })
       
});
exports.GetAllRealState= GetAllData(RealState);
exports.GetOneState= GetOneData(RealState);
exports.UpdateRealState= UpdateData(RealState);
exports.DeleteOneRealState= CatchAsync(async (req, res)=>{
    const param= req.params.id;
    await Mark.deleteMany({RealStateId: param});
    await Appointment.deleteMany({RealStateId: param})
    await Rate.deleteMany({RealStateId: param})
    await RealState.findByIdAndDelete(param);
    
    res.status(200).json({
        status:'success',
        
    })
});


exports.GetMyRealState = CatchAsync( async (req, res, next)=>{
            // console.log(req.user)
            const LimitData =  new ApiFeacher(RealState.find({RegistrarId: req.user._id}), req.query).paginate();
            const data = await LimitData.data;
            const lengthData = (await RealState.find({RegistrarId: req.user._id})).length
            res.status(200).json({
                status: 'succes',
                data: data,
                length: lengthData
            })
})


exports.WriteCity=CatchAsync(async (req,res,next)=>{

        // console.log(req.body)
        if(!req.body.City_id){
        const filter= await City.find({...req.body});
        
        if(filter.length  < 1){
         await City.create(req.body);

       }
        }else{
            await City.findByIdAndUpdate(req.body.City_id, {...req.body})
        }
        res.status(200).json({
            status:'success',
        })
        next()
});


exports.WriteArea=CatchAsync( async(req, res, next)=>{
    const cityId= req.body.CityId;
    const findcity= await City.findOne({name:cityId});
    
    req.body.objid= findcity?._id;
    req.body.CityId= findcity?.id;
    // console.log(req.body)
    
    if(!req.body.Area_id){
        const filter= await Area.find({...req.body});
        if(filter.length  < 1){
        await Area.create(req.body);

        res.status(200).json({
            status:'success',
        })

        } 

       
    }else{
        await Area.findByIdAndUpdate(req.body.Area_id,{...req.body});

        res.status(200).json({
            status:'success',
        })
    }
    next();
})


exports.GetAllCity=CatchAsync( async( req, res)=>{

        const city= await City.find().select('-Description');
       
        
        // if(city.length === 0){
        //     await Promise.all(
        //     Citys.map(async(mp)=>{
        //         await City.create({...mp});
        //     }))
         
        // }
       
        res.status(200).json({
            status: 'success',
            data: city
        })
});

exports.GetAllArea=CatchAsync( async( req, res)=>{
        const id= req.query.id;
        
    const city= await Area.find({CityId: id}).sort('-sortLevel').select('-Description');
    // const ae = await Area.find();
    // if(ae.length === 0){
        
    //     let CId = {};
    //     await Promise.all(
    //         Citys.map(async(mp,i)=>{
    //             const obj = await City.findOne({Id: mp.CityId, name: mp.name});
    //             CId[`${mp.id}`] = obj._id
                
    //            })
    //     )
        
    //     await Promise.all(
         
    //         Areas.map(async(mp,i)=>{
    //             //    if(mp.CityId !== 621){ 
                     
    //                 let AreaId = `${100 + i}` + mp.CityId ;
    //                  await Area.create({Id: AreaId,objid: CId[`${mp.CityId}`], ...mp });
                    
    //             }
                    
    //                 )
    //                 );
    //             }
                //  await City.deleteMany();
                //  await Area.deleteMany();
                // await Area.deleteMany();
                // console.log(ae.length, Areas.length)
    res.status(200).json({
        status: 'success',
        data: city
    })
});

exports.FindCity=CatchAsync(async(req, res)=>{
    let id= req.query.city;
    
    if(req.query.cityName){
        id = new RegExp(req.query.cityName,'i')
    }
    let city= await City.find({name:id});
    
    if(req.query.cityName){
    city = city.map(mp=>{
        return {id: mp.id, _id: mp._id, name:mp.name}
    })
        }
    res.status(200).json({
        status: 'success',
        data: city
    })
        
})

exports.FilterCity=CatchAsync(async(req, res)=>{
    const id= req.query.id;

    const findCityName = await City.findById(id);

    const realstateLength = await RealState.find({City: findCityName.name}).skip(1).limit(10);

    if(realstateLength.length > 0){
        if(realstateLength.length > 0){
            res.status(200).json({
                message:'در این شهر ملک ثبت شده است!!'
                
            })
            return;
        }
    }

    await City.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        
    })
})

exports.FindArea=CatchAsync(async(req, res)=>{
    let query= req.query;
    let AreaDT;
    if(query.area){
    
       AreaDT= await Area.find({areaName: query.area});
    }else if(query.areaName){
        const regex = new RegExp(query.areaName, 'i')
        AreaDT = await Area.find({areaName: regex }).skip(1).limit(15);
    }

    res.status(200).json({
        status: 'success',
        data: AreaDT
    })
})

exports.FilterArea=CatchAsync(async(req, res)=>{
    const id= req.query.id;
    const realstateLength = await RealState.find({AreaObjId: id}).skip(1).limit(10);

    if(realstateLength.length > 0){
        res.status(200).json({
            message:'در این منطقه ملک ثبت شده است!!'
            
        })
        return;
    }

    await Area.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        
    })
})


// exports.FindCityByName=CatchAsync(async(req, res)=>{
//     const id= req.query.name;
    
//     const city= await City.find({name:id});

//     res.status(200).json({
//         status: 'success',
//         data: city
//     })
        
// })