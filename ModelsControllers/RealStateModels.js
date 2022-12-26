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
    min:[2,'error length str']

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
    
    type:Number

},
Location:{
    // required:[true,'error loc'],
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
    // required: [true, 'real state not exist esquier name']
},
EsquierPhoneNumber: {
            type: Number,
            // required: [true, 'real state not exist esquier ph']
},

RepresenativePhoneNumber: {
    type: Number
            
},
RepresenativeName: {
    type: String
            
},
PricePerMeter: {
    type: Number
            
},
TheWay:{
    type: String
},

TheWell: {
    default:false,
    type:Boolean
},
DbWindow: {
    default:false,
    type:Boolean
},
Phone: {
    default:false,
    type:Boolean
},
License: {
    default:false,
    type:Boolean
},
Gas: {
    default:false,
    type:Boolean
},
Wastewater: {
    default:false,
    type:Boolean
},
endOfWork: {
    default:false,
    type:Boolean
},
Janitor: {
    default:false,
    type:Boolean
},
HowManyFloors: {
    // default:false,
    type:String
},
HowManyUnits: {
    // default:false,
    type:String
},
PropertyFloor: {
    // default:false,
    type:String
},
NumberOfUnits: {
    // default:false,
    type:String
},
HowManyFloors: {
    // default:false,
    type:String
},
SoundInsoulation: {
    // default:false,
    type:Boolean
},
Water:{
    type:Boolean
},
MonthlyCharge: {
    // default:false,
    type:Number
},
TrasMeasure: {
    // default:false,
    type:Number
},
DocumentType:  {
    // default:false,
    type:String
},
GoooyaExplain:{
    // default:false,
    type:String
},
Exchange: {
    type: Boolean,
    default: false
},
AgreedPrice:{
    type: Boolean,
    default: false
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
OfstorageMeasure:{
    type: Number
},
Show:{
    type: String,
    default:'ok',
    enum:['ok','not', 'unseen', 'pending'],
    require: [true, 'not enterd Show']
},
createAt:{
    type:Date,
    default: Date.now()
},
UpdateAt:{
    type: Date
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
        this.populate({
            path: "AreaObjId",
            select: "areatype areaName _id landUse latitude longtitude ReginonalPrice humanTissue areaNature"
        })
        next();
})
// RealStateSchema.pre(/^(updateOne|save|findOneAndUpdate)/,async function(next){
//     // console.log(this.UpdateAt,'saduiashuy')
//         this.UpdateAt = Date.now();

//         next()
// })
 const RealState= mongoose.model('RealState', RealStateSchema);

 module.exports= RealState;