
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

console.log(process.env.LOCAL_DATABASE)
let mongo = [];
mongoose.connect(process.env.LOCAL_DATABASE,{
    // useCreateIndex: true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log('connect mongoose');mongo.push(['success'])})
.catch((e)=>{console.log(e, 'cant connect ...!');mongo.push(['fail'])});
const RealState = require('../ModelsControllers/RealStateModels');

setTimeout(()=>{
    const updateShow =async()=>{
        try{
        const allData = await RealState.find();
                // console.log(allData)
        // allData.map(async(mp)=>{
          
    
        // })
        }catch (er){
            console.log(er);
        }
    
    
        process.exit();
        
    }
    switch(process.argv[2]){
        case '--updateShow':
            updateShow();
        break;
      
            
    }
},[4000])


// console.log(process.argv[2], mongo)

// if(mongo.length > 0 && mongo[0] === 'success'){

