const mongoose=require('mongoose');
const validator=require('validator');


const ReviweSchema= mongoose.Schema({
    Message:{
        required:[true,''],
        type:String,
       },
     RealStateId:{
        
        type:mongoose.Schema.ObjectId,
        ref:'RealState'
    },
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:'Authhh'
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
    
});


const Reviwe= mongoose.model('Reviwe', ReviweSchema);

module.exports=Reviwe;


// validate:{
//     validator:function(val){
//         return val !== ''},
//         message: 'message not empety'
    
   
// }