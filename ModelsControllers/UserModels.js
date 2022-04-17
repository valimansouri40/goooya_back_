const mongoose = require("mongoose");
const bycript= require('bcryptjs');
const crypto= require('crypto');
const validator= require('validator');

const UserSchema= mongoose.Schema({
        FristName:{
            type:String,
            required:[true,'نام خود را وارد کنید']
        },
        LastName:{
            type: String,
           
        },
        PhoneNumber:{
            type: Number,
            required:true,
            unique:true,
            validate:{
                validator: function(e){
                    return new RegExp('^(\\0|0)?9\\d{9}$').test(e)
                },
                message:'not valid'
            }
        },
        Password:{
            type:String,
            select:false,
            required:[true,''],
            min:6,
            max:20
        },
        Image:{
            type: String
        },
        createAt:{
            type:Date,
            default: Date.now()
        },
        role:{
            type:String,
            default:'admin',
            enum:['admin','user', 'advisor', 'employee', 'dealer']
        },
        CitysAndAreas:{
            type: Array
        },
        City:{
            type: Array
        },
        AdvisorAddress:{
            type: String
        },
        SineupCode:Number,
        ResetePassword:String,
        ResetePasswordExpires:Date,
        ResetePasswordChange:Date,
        

})



UserSchema.pre('save', async function(next){

    if(!this.isModified('Password')) return next();

        this.Password =await bycript.hash(this.Password, 12);
    
        next();

});


UserSchema.methods.compirePassword=async function(pas1,pas2){
        return await bycript.compare(pas1,pas2);
}

UserSchema.methods.ResetPasswordcode=  function(){
        const randombyte= crypto.randomBytes(6).toString('hex');
        this.ResetPassword = crypto.createHash('sha256').update(randombyte).digest('hex');
        this.ResetePasswordExpires = Date.now() + 3 * 60 * 1000;

        return randombyte;
}

UserSchema.methods.CreateRandomPass= async function(){
    const min = Math.ceil(15689);
    const max = Math.floor(97238);
    const code = Math.floor(Math.random() * (max - min)) + min;
    
    return code;
}

const User= mongoose.model('Authhh',UserSchema);

module.exports=User;