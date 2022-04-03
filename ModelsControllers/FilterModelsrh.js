const mongoose= require('mongoose');


const FilterSchemarh= mongoose.Schema({

    YearBuild:{
        required:[true,'error year'],
        type:Array
    },
    Measure:{
        required:[true,'error year'],
        type:Array
    },
    Price:{
        required:[true,'error year'],
        type:Array
    },
    Lease:{
        required:[true,'error year'],
        type:Array
    }
})

const Filterrh= mongoose.model('filterrh', FilterSchemarh);

module.exports= Filterrh;