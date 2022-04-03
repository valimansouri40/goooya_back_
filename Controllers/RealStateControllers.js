const RealState= require('../ModelsControllers/RealStateModels');
const { CatchAsync } = require('../Utils/CatchAsync');
const {PostData, GetAllData, GetOneData, UpdateData, DeleteOneData } = require("./FactoryControllers");
const City = require('../ModelsControllers/CityModels');
const Area = require('../ModelsControllers/AreaModels');
const sharp= require('sharp');
const multer= require('multer');
const fs= require('fs');


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
            
        // realstate.Image.map(mp=>{
        //     console.log(mp)
        //      // fs.unlinkSync(`public/img/${mp}`)
        // })
        realstate.Image.forEach(path => fs.existsSync(`public/img/${path}`) 
        && fs.unlinkSync(`public/img/${path}`))
        next();
})

exports.ImageHandller=CatchAsync(async (req,res,next)=>{
    console.log('req.body')
    if(req.body.Image ){
        
        const images= req.body.Image;
            
        req.body.Image = [];

      
  await Promise.all(
    images.map(async (file, i) => {
      const filename = `realstate-${Date.now()}-${i + 1}.jpeg`;
        console.log(filename)
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

   const model= await RealState.create(req.body);
      
        res.json({
            status:'succes',
        })
        next()
});
exports.GetAllRealState= GetAllData(RealState);
exports.GetOneState= GetOneData(RealState);
exports.UpdateRealState= UpdateData(RealState);
exports.DeleteOneRealState= DeleteOneData(RealState);





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
    console.log(req.body.objid)

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
        console.log(id)
    const city= await Area.find({objid: id});
    res.status(200).json({
        status: 'succes',
        data: city
    })
});

exports.FindCity=CatchAsync(async(req, res)=>{
    const id= req.query.city;
    console.log(id)
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
    console.log(req.query)
    const city= await Area.find({areaName: id});
    console.log(city)

    res.status(200).json({
        status: 'succes',
        data: city
    })
})

exports.FilterArea=CatchAsync(async(req, res)=>{
    const id= req.query.id;
    console.log(id)
    await Area.findByIdAndDelete(id);
    res.status(200).json({
        status: 'succes',
        
    })
})