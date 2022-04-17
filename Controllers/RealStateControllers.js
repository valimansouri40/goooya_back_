const RealState= require('../ModelsControllers/RealStateModels');
const { CatchAsync } = require('../Utils/CatchAsync');
const { GetAllData, GetOneData, UpdateData } = require("./FactoryControllers");
const City = require('../ModelsControllers/CityModels');
const Area = require('../ModelsControllers/AreaModels');
const sharp= require('sharp');
const multer= require('multer');
const fs= require('fs');
const Mark = require('../ModelsControllers/MarkModels');
const Appointment = require('../ModelsControllers/AppointmentModels');
const Rate = require('../ModelsControllers/RateModels');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (req.body.Image) {
    cb(null, true);}
 
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
  { name: 'Image', maxCount: 5 }
]);

exports.DeleteImageExtra=CatchAsync(async (req, res,next)=>{
        if(!req.body.Image) next();
        const paramm= req.params.id;

        const realstate= await RealState.findById(paramm);
            
        realstate.Image.forEach(path => fs.existsSync(`public/img/${path}`) 
        && fs.unlinkSync(`public/img/${path}`))
        next();
})

exports.CreateRealStateNumber=CatchAsync(async(req, res , next)=>{

const fn= await RealState.findOne({City: req.body.City, Area: req.body.Area}).sort('-RealStateNumber')
console.log(fn ,req.body.RealStateNumber);
if(fn){
 req.body.RealStateNumber = fn.RealStateNumber * 1  + 2;
 
}else{
 req.body.RealStateNumber = req.body.cityandareaid + '1000';
 req.body.RealStateNumber = req.body.RealStateNumber * 1;
    
}
console.log(fn ,req.body.RealStateNumber);
//  await RealState.deleteMany();
   next();
});

exports.ImageHandller=CatchAsync(async (req,res,next)=>{
    
    if(req.body.Image ){
        
        const images= req.body.Image;
            
        req.body.Image = [];

      
  await Promise.all(
    images.map(async (file, i) => {
      const filename = `realstate-${req.body.RealStateNumber}-${i + 1}.jpeg`;
        
        const fl= file.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');
           
      await sharp(imgBuffer).jpeg({ quality: 30 })
      .resize(1920, 1000)
      .toFile(`public/img/${filename}`)
      .then(data => {
          console.log('normal: ')

          
      })
      .catch(err => console.log(`downisze issue ${err}`))

      req.body.Image.push(filename);
    }))
        }
    
    next();
})

exports.PostRealState= CatchAsync(async (req, res, next)=>{
   
    await RealState.create(req.body);
      
        res.status(200).json({
            status:'succes',
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
            status:'succes',
        })}
        next()
});




exports.WriteArea=CatchAsync( async(req, res, next)=>{

    const cityId= req.body.CityId;
    const findcity= await City.findOne({id:cityId});

    req.body.objid= findcity._id;

    const filter= await Area.find({...req.body});
    if(filter.length  < 1){
     await Area.create(req.body);
    res.status(200).json({
        status:'succes',
    })
    } 
    next()
})

exports.GetAllCity=CatchAsync( async( req, res)=>{

        const city= await City.find();
        res.status(200).json({
            status: 'succes',
            data: city
        })
});

exports.GetAllArea=CatchAsync( async( req, res)=>{
        const id= req.query.id;
        
    const city= await Area.find({objid: id});
    res.status(200).json({
        status: 'succes',
        data: city
    })
});

exports.FindCity=CatchAsync(async(req, res)=>{
    const id= req.query.city;
    
    const city= await City.find({name:id});
    res.status(200).json({
        status: 'succes',
        data: city
    })
        
})

exports.FilterCity=CatchAsync(async(req, res)=>{
    const id= req.query.id;
    await City.findByIdAndDelete(id);
    res.status(200).json({
        status: 'succes',
        
    })
})

exports.FindArea=CatchAsync(async(req, res)=>{
    const id= req.query.area;
    
    const city= await Area.find({areaName: id});
    

    res.status(200).json({
        status: 'succes',
        data: city
    })
})

exports.FilterArea=CatchAsync(async(req, res)=>{
    const id= req.query.id;
    
    await Area.findByIdAndDelete(id);
    res.status(200).json({
        status: 'succes',
        
    })
})