const mongoose= require('mongoose');


const FilterSchema= mongoose.Schema({

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
    }
})

const Filter= mongoose.model('filter', FilterSchema);

module.exports= Filter;