const { default: mongoose } = require("mongoose");

const RealStateSchema= mongoose.Schema({
 Aggrement: {
            default:false,
            type:Boolean
    },
Area: {
    required:[true,'error str'],
        type:String,
        min:[3,'error length str']
},
Assansor: {
        default:false,
        type:Boolean
},
Balcony: {
    type:String,

},
City: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
ConferaenceHall: {
        default:false,
        type:Boolean
},
CoolerSystem: {
    type:String,

},
DocumentOnership: {
    type:String,

},
DocumentSituation: {
    type:String,

},
Entry: {
    type:String,
},
Explain: {
    type:String,
},
Flooring: {
    type:String,

},
Floors: {
    type:String,
},
FullMortgage: {
        
        type:Boolean,
        default:false
},
HeaterSystem: {
    
    type:String,
},
Image: {
    required:[true,'error str'],
    type:Array

},
Immediatly: {
        default:false,
        type:Boolean
},
Jacuzzi: {
        default:false,
        type:Boolean
},
Kitchen: {
    
    type:String,
    

},
Labi: {
        default:false,
        type:Boolean
},
Lease: {
    
    type:String,
    min:[3,'error length str']

},
Location:{
    required:[true,'error loc'],
    type: Object
},
Masahat: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
Measure: {
    required:[true,'error str'],
    type:Number,
    min:40

},
Mortgage: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
OfStorage: {
        default:false,
        type:Boolean
},
Parking: {
        default:false,
        type:Boolean
},
Pasio: {
        default:false,
        type:Boolean
},
Pool: {
        default:false,
        type:Boolean
},
PropertyDirection: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
PropertySituation: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
Security: {
        default:false,
        type:Boolean
},
Service: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
SomeRoom: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
Sona: {
        default:false,
        type:Boolean
},
Subject: {
    type:String,
},
Tab:{
    required:[true,'error str'],
    type:String,
    default:'rahn',
    enum:['rahn','sells']

},
Tipic:{
    required:[true,'error str'],
    type:String,
    default:'lease',
    enum:['rahn','sells']

},
Tras: {
        default:false,
        type:Boolean
},
Type:{
    required:[true,'error str'],
    type:String,

},
TypeState: {
    required:[true,'error str'],
    type:String,
    min:[3,'error length str']

},
YearBuild: {
    required:[true,'error num'],
    type:Number

},
Rating:{
    type:Number,
    default:4.5,
    max:5,
    min:1,
    // set: val=> Math.round(val/10) * 10
},
ratingsQuantity:{
    type: Number,
    default: 0
},
createAt:{
    type:Date,
    default: Date.now()
}
});



 const RealState= mongoose.model('RealState', RealStateSchema);

 module.exports= RealState;