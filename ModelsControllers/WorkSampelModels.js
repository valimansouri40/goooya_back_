const { default: mongoose } = require("mongoose");


const WorkSampelSchema=mongoose.Schema({

    Image:{
        type: String,
       
    },
    Text:{
        type: String,
       
    },
    Tab:{
        type: String,
        required:[true, 'error tabs']
    },
    Passage:{
        type: String,
        
        
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
});

const WorkSampel= mongoose.model('Worksampel', WorkSampelSchema);

module.exports= WorkSampel;