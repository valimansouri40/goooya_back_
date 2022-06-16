const sharp = require('sharp');
const WorkSampel = require('../ModelsControllers/WorkSampelModels');
const ApiFeacher = require('../Utils/ApiFeacher');
const {CatchAsync} = require('../Utils/CatchAsync');
const factory =require('./FactoryControllers');
const fs = require('fs')

exports.SaveImg=CatchAsync(async (req,res,next)=>{
           
        if(!req.body.Img) next();
 
      const filename = `worksampel-${Date.now()}-v2.jpeg`;
        
        const fl= req.body.Img.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');
            
      await sharp(imgBuffer).jpeg({ quality: 30 })
      .resize(200, 200)
      .toFile(`public/WorkSampelimg/${filename}`)
      .then(data => {
          console.log('normal: ')
      })
      .catch(err => console.log(`downisze issue ${err}`))

      req.body.Image = filename
    next();
})

exports.WorkSpacePost= CatchAsync(async (req, res,next)=>{
            
            const switcharr= ['Registrationwork','Advocacy', 'ExpertofJustice', 'endofwork', 'lisense'];
           let sampel;
            if(!switcharr.includes(req.body.Tab)){
                if(!req.body.Image)throw( 'not exist img')
            sampel= await WorkSampel.create(req.body)
            }else if(switcharr.includes(req.body.Tab)){
                const fn= await WorkSampel.find({Tab: req.body.Tab});
                
                if(fn.length === 0){
                   sampel= await WorkSampel.create(req.body)
                }else if(fn.length > 0){
                  await WorkSampel.deleteOne({Tab: req.body.Tab})
                   await WorkSampel.create(req.body);
                }
            }
           
            
 res.status(201).json({
                status: 'succes',
            })   
});

exports.GetImg=CatchAsync(async(req, res, next)=>{

            const worksampel= new ApiFeacher( WorkSampel.find(), req.query).paginate().filter();

            const ws=await worksampel.data;
          
             ws.map(mp=>{
                 if(mp.Image){
                    const kl= fs.existsSync(`public/WorkSampelimg/${mp.Image}`)?fs.readFileSync(`public/WorkSampelimg/${mp.Image}`,'base64'):null;
                    mp.Image = kl;
                  }
            });
                
            res.status(200).json({
                status: 'succes',
                data: ws,
            })
})

 exports.WorkSampelDelete= factory.DeleteOneData(WorkSampel);