
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const RealState = require('../ModelsControllers/RealStateModels');

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


const updateShow =async()=>{
    console.log('djhuyagy vali')
    try{
    const allData = await RealState.find();

    allData.map(async(mp)=>{
        await RealState.findByIdAndUpdate(mp._id, {Show:'ok'});

    })
    }catch (er){
        console.log(er);
    }


    process.exit();
    
}

console.log(process.argv[2], mongo)

if(mongo.length > 0 && mongo[0] === 'success'){
    switch(process.argv[2]){
    case '--updateShow':
        updateShow();
    break;
  
        
}
}