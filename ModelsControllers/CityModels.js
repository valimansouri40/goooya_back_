const { default: mongoose } = require("mongoose");

const CitySchema= mongoose.Schema({

    bakhsh:  {
        required:[true,'error str'],
        type:String,
    },
    id: {
        required:[true,'error str'],
        type:Number,
        unique:true
    },
name: {
    required:[true,'error str'],
    type:String,
    unique:true
},
ostan: {
    required:[true,'error str'],
    type:String,
},
shahrestan: {
    required:[true,'error str'],
    type:String,
},
weather: {
    required:[true,'error str'],
    type:String,
},
})


const City= mongoose.model('city', CitySchema);

module.exports= City;