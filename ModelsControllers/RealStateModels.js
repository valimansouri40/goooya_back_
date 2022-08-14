const { default: mongoose } = require("mongoose");

const RealStateSchema= mongoose.Schema({
 Aggrement: {
            default:false,
            type:Boolean
    },
 
Area: {
    required:[true,'error str'],
        type:String,
        min:[2,'error length str']
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
    required:[true,'error img'],
    type:Array,
    validate:{
        validator: function(e){
            return e.length > 0;
        },
        message:'not valid'
    }

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
    
    type:Number,
    min:[3,'error length str']

},
Location:{
    required:[true,'error loc'],
    type: Object
},
Masahat: {
    type:String
},
Measure: {
    required:[true,'error str'],
    type:Number

},
Mortgage: {
    type:Number

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
    type:String
},
PropertySituation: {
    type:String
},
Security: {
        default:false,
        type:Boolean
},
Service: {
    type:String,
    min:[3,'error length str']

},
SomeRoom: {
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
RegistrarId:{
    type:mongoose.Schema.ObjectId,
        ref:'Authhh',
},
AdvisorId:{
    type:mongoose.Schema.ObjectId,
        ref:'Authhh',
    
},
RealStateNumber:{
    type: Number,
    unique:true,
    required: [true, 'real state not exist']
},
EsquierName: {
    type: String,
    required: [true, 'real state not exist esquier name']
},
EsquierPhoneNumber: {
            type: Number,
            required: [true, 'real state not exist esquier ph']
},
Mark:{
    type: Boolean,
    default: false
},
AreaObjId:{
    type:mongoose.Schema.ObjectId,
        ref:'Area',
},
NoneId:{
    type: Number
},
createAt:{
    type:Date,
    default: Date.now()
}
});

// RealStateSchema.pre('save', async function(next){
//      this.RealStateNumber = this
// })
RealStateSchema.pre('find', async function(next){
    this.populate({
        path: "AreaObjId",
        select: "areatype areaName _id"
    })
    next();
})
RealStateSchema.pre('findOne',async function(next){
        this.populate({
            path:'AdvisorId',
            select: 'FristName AdvisorAddress RateAdvisor LastName Image PhoneNumber _id role '
        })
        this.populate({
            path:'RegistrarId',
            select: 'FristName LastName  PhoneNumber _id role '
        });
       
        next();
})

 const RealState= mongoose.model('RealState', RealStateSchema);

 module.exports= RealState;