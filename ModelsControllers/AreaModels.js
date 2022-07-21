const { default: mongoose } = require("mongoose");


const AreaSchema=new mongoose.Schema({
    CityId:{
        required:[true,'error area'],
        type:Number,
    },
    // objid:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"city"
    // },
   areaName :{
       required:[true,'error area'],
       type:String,
       max:[25, 'error length']
   },
   Id:{
    type:Number,
    unique:true,
    required:[true,'error area']
},
   longtitude :{
    // required:[true,'error area'],
    type:Number,
   
},
   latitude :{
    // required:[true,'error area'],
    type:Number,
},
   locationDescription:{
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   subwayAvailability : {
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   busAndTaxi : {
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   areaNature : {
    // required:[true,'error area'],
    type:Array,
    // max:[25, 'error length']
},
   areaTemplate:{
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   humanTissue : {
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   ReginonalPrice: {
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   floorArea:{
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
},
   landUse:{
    // required:[true,'error area'],
    type:String,
    max:[25, 'error length']
}
})

// AreaSchema.pre(/^find/, function(next) {
//     this.populate({
//       path: 'objid',
//       select: 'name _id'
//     });
  
//     next();
//   });

const Area= mongoose.model('Area', AreaSchema);

module.exports= Area;