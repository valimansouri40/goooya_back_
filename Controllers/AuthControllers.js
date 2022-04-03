const User = require("../ModelsControllers/UserModels");
const jwt= require('jsonwebtoken');
const { CatchAsync } = require("../Utils/CatchAsync");
const SmsHandller = require("../Utils/SMS");
const crypto = require('crypto');
const { promisify } = require("util");
const { UpdateData } = require("./FactoryControllers");
const Request= require('../ModelsControllers/RequestModels')
const bycript= require('bcryptjs')

const CreateToken= (id)=> jwt.sign({id}, process.env.JSONWEBTOKEN_PASSWORD,{
    expiresIn: process.env.JSONWEBTOKEN_EXPIRES});


const CreateAndSendCookie=(user,res,Status)=>{
        const token= CreateToken(user._id);
        
        res.status(Status).json({
            status: 'success',
            data: token
        })
}



exports.Protected= CatchAsync(async (req, res,next)=>{

        let token;
    
        if( req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization .split(' ')[1]
        }else{
            throw('not exist cookie')
        }
        
        const unhash=await promisify(jwt.verify)(token , process.env.JSONWEBTOKEN_PASSWORD)


        const user= await User.findById(unhash.id);
        
        if(!user){
            throw('not valid cookie')
        }

        req.user= user;
        next();
})

exports.Sineup= CatchAsync(async(req,res,next)=>{

        if(!req.body) throw('error sineup');
        console.log(req.body)
    //await User.deleteMany();
        
         const user = await User.create(req.body);

         const code= await user.CreateRandomPass();
            user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            user.SineupCode = code;
            await user.save({validateBeforeSave:false})
            console.log(code, user);
            
            SmsHandller(code, req.body.PhoneNumber);
        
        res.status(200).json({
            status: 'success',
            
        });

        
});

exports.ReciveSMS=CatchAsync(async (req, res,next)=>{
            const {PhoneNumber}= req.body;

            if(!PhoneNumber) throw('error recive sms 1')

            const user= await User.findOne({PhoneNumber:PhoneNumber});

            if(!PhoneNumber) throw('error cant find your phonenumber')

            // const code= await user.CreateRandomPass();
            // user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            // user.SineupCode = code;
            // await user.save({validateBeforeSave:false})
            
            
            // SmsHandller(code, PhoneNumber);

            res.status(200).json({
                status: 'success',
                
            });

})

exports.SendSmSPass=CatchAsync(async (req, res, next)=>{

            const {smspass}= req.body;
           

            if(!req.body) throw('error notget smspass');
           

            const user = await User.findOne({SineupCode: smspass,
                ResetePasswordExpires:{$gt:Date.now()}});
            
            if(!user) throw('error notget smspass 2');
           

            CreateAndSendCookie(user, res, 200);
            
});

exports.Login= CatchAsync(async (req,res,next)=>{
    console.log('login')
            await User.deleteMany()
        const {PhoneNumber, Password} = req.body;

        if( !PhoneNumber && !Password){
            throw('error login');
           
        }

        const user= await User.findOne({PhoneNumber: PhoneNumber})
        .select('Password');

        if(!user || !(await user.compirePassword( Password,user.Password))) throw('error login compirePassword');

        CreateAndSendCookie(user, res, 200);
});



exports.ForgetPassword=CatchAsync( async (req,res,next)=>{
            const {PhoneNumber}= req.body;

            if(!PhoneNumber){
                throw('error forgetpassword 1 ');
            }
            const user= await User.findOne({PhoneNumber:PhoneNumber});

            if(!user){
                throw('error forgetpassword 2');
            }
                
            const randombyte =await user.ResetPasswordcode();
                await user.save({validateBeforeSave:false});

                try{
                    SmsHandller(randombyte, PhoneNumber);
                    console.log(randombyte)
                    res.status(200).json({
                        status:'success',
                        
                    })
                } catch(er){
                    

                    user.ResetPassword = undefined;
                    user.ResetePasswordExpires = undefined;
                    res.status(404).json({
                        status:'faill'
                    })
                }
           

});


exports.ResetPassword=CatchAsync(async (req,res,next)=>{
        const {randomPassword, Password} =req.body;

        const hashrandombyt= crypto.createHash('sha256').update(randomPassword).digest('hex');

        const user= await User.findOne({ResetPassword: hashrandombyt, 
            ResetePasswordExpires:{$gt:Date.now()}});

        if(!user){
            throw('error resetpassword 1')
        }

        user.ResetePasswordExpires=undefined;
        user.ResetPassword = undefined;
        user.Password= Password;
        user.ResetePasswordChange= Date.now();
        await user.save();

        CreateAndSendCookie(user, res, 200);

})

exports.GetMeData=CatchAsync( async (req, res)=>{
            
           
        res.status(200).json({
            status:'success',
            data: req.user
        })

})

exports.UpdateProfile=UpdateData(User);

exports.ResterictTo= (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
    //   console.log(req.user)
        console.log(roles, req.user.role)
      if (!roles.includes(req.user.role))  throw('your dosent admin')
  
      next();
    };
  };

exports.ChangePassword=CatchAsync(async (req, res,next)=>{
                console.log(req.body)
            const hash= bycript.hash(req.body.NewPassword,12)
            const user= await User.findByIdAndUpdate(req.user._id,hash).select('+Password');
            console.log(user)
            res.status(200).json({
                status:'succes',
            })
})

exports.RequestJobHandller=CatchAsync(async (req, res, next)=>{
            console.log(req.body)
            const {PhoneNumber,FristName}= req.body;
            if(!PhoneNumber, !FristName) throw ('error phn');
            //  await Request.deleteMany()
            let user= await User.find({PhoneNumber:PhoneNumber});
                    let token
                   
            if(user.length === 0){
                req.body.Password ='12345678';
                
                 user= await User.create(req.body);
                 if(!user) throw('error')
                 req.body.Objid = user._id;
                 const rd= await Request.create(req.body)
                 const code= await user.CreateRandomPass();
                 user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
                 user.SineupCode = code;
                 await user.save({validateBeforeSave:false})
                 console.log(code);
                 
                // SmsHandller(code, PhoneNumber);
               
            }else{
                req.body.Objid = user[0]._id;
                 await Request.create(req.body);
               token= CreateToken(user[0]._id)
               console.log(user[0]._id)
            }

            
     
     
     res.status(200).json({
         status: 'success',
         token: token
     });
  })

  exports.UpdateDataWithField=  UpdateData(User)

exports.GetOneUser= CatchAsync(async(req, res)=>{
            const param= req.params.id;
            console.log(param)
            const model = await User.findOne({PhoneNumber: param});

            res.status(200).json({
                status:'success',
                data: model
            })
})