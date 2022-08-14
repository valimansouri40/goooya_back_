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
const { Citys } = require('../City&Area/city');
const { Areas } = require('../City&Area/Areas');
const { find } = require('../ModelsControllers/RealStateModels');

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

exports.DeleteImageExtra=CatchAsync(async (req, res,next)=>{
        // console.log(req.body.ListImagesDeleted.length === 0 )
        if(req.body.ListImagesDeleted.length !== 0 ){ 
        
        const paramm= req.params.id;

        const realstate= await RealState.findById(paramm);
            
        realstate.Image.forEach(path => fs.existsSync(`public/img/${path}`) 
        && fs.unlinkSync(`public/img/${path}`));
        next();
        }else{
        next();
    }
})

const IdHandller = (lastId)=>{
    const pers = 1 / lastId;
    const bettween = (pers + 1) * lastId;
    return bettween;
}
exports.CreateRealStateNumber=CatchAsync(async(req, res , next)=>{
    // console.log(req.body.Image)
    const fn= await RealState.find({City: req.body.City, Area: req.body.Area}).sort('-RealStateNumber')
    
    if(fn.length > 0){
    req.body.RealStateNumber = IdHandller(fn[0].RealStateNumber);
 
    }else{
    req.body.RealStateNumber = req.body.cityandareaid;
    
}
    // console.log(await RealState.find({RealStateNumber:req.body.RealStateNumber}))
   next();
});

exports.ImageHandller=CatchAsync(async (req,res,next)=>{
    // console.log(req.body.Image[0],)
    // if(req.body.Image[0].endsWith(".jpeg")) {delete req.body.Image; console.log("delete")}
    if(req.body.Image && !req.body.Image[0].endsWith(".jpeg")){
       
        const images= req.body.Image;
            
        req.body.Image = [];
        
    //   console.log(req.body.RealStateNumber);
  await Promise.all(
    images.map(async (file, i) => {
      const filename = `realstate-${req.body.RealStateNumber}-${i + 1}.jpeg`;
        // console.log(file)
        const fl= file.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');
           
      await sharp(imgBuffer).jpeg({ quality: 50 })
      .resize(1920, 1000)
      .toFile(`public/img/${filename}`)
      .then(data => {
          console.log('normal: ')

          
      })
      .catch(err =>{
          console.log(`downisze issue ${err}`)
        throw('can not image save')
    })

      req.body.Image.push(filename);
    }))
        }
        
    next();
})

exports.PostRealState= CatchAsync(async (req, res, next)=>{
    // console.log('ugytf','jfiuhsdui', req.body.Image, req.body.RealStateNumber)
   
    if(req.user.role === 'dealer' ){
        req.body.NoneId= 1234
    }else{
        delete req.body.NoneId

    }
    await RealState.create(req.body);
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





exports.WriteCity=CatchAsync(async (req,res,next)=>{
    
        const filter= await City.find({...req.body});
        
        if(filter.length  < 1){
         await City.create(req.body);

        res.status(200).json({
            status:'success',
        })}
        next()
});


exports.WriteArea=CatchAsync( async(req, res, next)=>{

    const cityId= req.body.CityId;
    const findcity= await City.findOne({name:cityId});

    req.body.objid= findcity._id;
    req.body.CityId= findcity.id;
    const filter= await Area.find({...req.body});
    if(filter.length  < 1){
     await Area.create(req.body);
    res.status(200).json({
        status:'success',
    })
    } 
    next();
})

exports.GetAllCity=CatchAsync( async( req, res)=>{

        const city= await City.find();
       
        // console.log('vali', Areas.length)
        if(city.length === 0){
            await Promise.all(
            Citys.map(async(mp)=>{
                await City.create({...mp});
            }))
         
        }
       
        res.status(200).json({
            status: 'success',
            data: city
        })
});

exports.GetAllArea=CatchAsync( async( req, res)=>{
        const id= req.query.id;
        
    const city= await Area.find({CityId: id});
    const ae = await Area.find();
    if(ae.length === 0){
        
        let CId = {};
        await Promise.all(
            Citys.map(async(mp,i)=>{
                const obj = await City.findOne({Id: mp.CityId, name: mp.name});
                CId[`${mp.id}`] = obj._id
                // console.log(await City.findById(CId[`${mp.id}`]))
               })
        )
        
        await Promise.all(
         
            Areas.map(async(mp,i)=>{
                //    if(mp.CityId !== 621){ 
                     
                    let AreaId = `${100 + i}` + mp.CityId ;
                     await Area.create({Id: AreaId,objid: CId[`${mp.CityId}`], ...mp });
                    console.log(AreaId, Number(AreaId), CId[`${mp.CityId}`]);}
                    
                    )
                    );
                }
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