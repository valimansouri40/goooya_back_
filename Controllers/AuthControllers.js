const User = require("../ModelsControllers/UserModels");
const jwt= require('jsonwebtoken');
const { CatchAsync } = require("../Utils/CatchAsync");
const SmsHandller = require("../Utils/SMS");
const crypto = require('crypto');
const { promisify } = require("util");
const { UpdateData } = require("./FactoryControllers");
const Request= require('../ModelsControllers/RequestModels')
const bycript= require('bcryptjs')
const {OAuth2Client} = require('google-auth-library')
const Client = new OAuth2Client({clientId:`709781770915-dnq6slr51r4477egfirredte8aasli1j.apps.googleusercontent.com`});

const CreateToken= (id)=> jwt.sign({id}, process.env.JSONWEBTOKEN_PASSWORD,{
    expiresIn: process.env.JSONWEBTOKEN_EXPIRES});


const CreateAndSendCookie=(user,res,Status)=>{
        const token= CreateToken(user._id);
        
        res.status(Status).json({
            status: 'success',
            data: token
        })
}

exports.GoogleLogin = CatchAsync(async(req, res, next)=>{

        const {token} = req.body;
            console.log('vali',req.body)
        const ticket = await Client.verifyIdToken({
            idToken: token,
            audience: "709781770915-dnq6slr51r4477egfirredte8aasli1j.apps.googleusercontent.com"
        });

        const { name, email, picture } = ticket.getPayload();
        console.log( name, email, picture, 'vali mansouri' )

        res.status(200).json({
            status: 'Success',
            
        })

})

exports.Protected= CatchAsync(async (req, res,next)=>{
            
        let token;
    
        if( req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(' ')[1]
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


exports.ProtectedV2= CatchAsync(async (req, res,next)=>{

    let token;
    req.user = null;
    let user;
    
    if(req.headers.authorization === 'application/json'){
        next()
    }else{
        
    token = req.headers.authorization.split(' ')[1];
    const unhash=await promisify(jwt.verify)(token , process.env.JSONWEBTOKEN_PASSWORD)
     user= await User.findById(unhash.id);
    
    if(!user){
        next();
    }

    req.user= user;
    next();
    }
    
    
   
})

exports.Sineup= CatchAsync(async(req,res,next)=>{

        if(!req.body) throw('error sineup');
        const existNumber = await User.findOne({PhoneNumber: req.body.PhoneNumber});
        console.log(existNumber)
           
            if( (await User.find()).length === 0){
                req.body.role = 'admin';
                }else{
                    req.body.role = 'user';
                }
        if(existNumber){
                res.status(200).json({error:"این شماره قبلا ثبت شده است"});
                throw('exist')
        }
         const user = await User.create(req.body);
         const code= await user.CreateRandomPass();
            user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            user.SineupCode = code;
            await user.save({validateBeforeSave:false});
            // const user = await User.create(req.body);
            SmsHandller(code, req.body.PhoneNumber);
        
        res.status(200).json({
            status: 'success',
            
        });

        
});

exports.ReciveSMS=CatchAsync(async (req, res,next)=>{
            const {PhoneNumber}= req.body;

            if(!PhoneNumber) throw('error recive sms 1')

            const user= await User.findOne({PhoneNumber:PhoneNumber});

            if(!user) throw('error cant find your phonenumber')

            const code= await user.CreateRandomPass();
            user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            user.SineupCode = code;
            await user.save({validateBeforeSave:false})
            
            
            SmsHandller(code, PhoneNumber);

            res.status(200).json({
                status: 'success',
                
            });

})

exports.SendSmSPass=CatchAsync(async (req, res, next)=>{

            const {smspass}= req.body;
           

            if(!smspass) throw('error notget smspass');
           

            const user = await User.findOne({SineupCode: smspass,
                ResetePasswordExpires:{$gt:Date.now()}});
            if(!user) {res.status(200).json({error:"کد وارد شده تطابق ندارد"});
                throw("کد وارد شده تطابق ندارد")}
            
            CreateAndSendCookie(user, res, 200);
            
});

exports.Login= CatchAsync(async (req,res,next)=>{
            
        const {PhoneNumber, Password} = req.body;

        if( !PhoneNumber && !Password){
            throw('error login');
           
        }

        const user= await User.findOne({PhoneNumber: PhoneNumber})
        .select('Password');

        if(!user || !(await user.compirePassword( Password,user.Password))) {
         res.status(200).json({error:user?'پسوورد وارد شده صحیح نمی باشد':'این شماره ثبت نشده است'})
            throw('error login compirePassword');
        }
        CreateAndSendCookie(user, res, 200);
});



exports.ForgetPassword=CatchAsync( async (req,res,next)=>{
            const {PhoneNumber}= req.body;

            if(!PhoneNumber){
                throw('error forgetpassword 1 ');
            }
            
            const user= await User.findOne({PhoneNumber: PhoneNumber});
            
            if(!user){
                // throw('error forgetpassword 2');
                res.status(200).json({error:'این شماره ثبت نشده است'})
                throw('این شماره ثبت نشده است')
            }
                
            const code= await user.CreateRandomPass();
            user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            user.SineupCode = code;
            await user.save({validateBeforeSave:false})
            console.log(code, user);
            
            SmsHandller(code, req.body.PhoneNumber);

                res.status(200).json({
                            status:'success',
                            
                        })

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
            
      
        //    if(req.user.Image && req.user.Image.endsWith("jpeg")){
        //    req.user.Image = fs.readFileSync(`public/img/${req.user.Image}`, "base64");
        // }
        res.status(200).json({
            status:'success',
            data: req.user
        })

})

exports.UpdateProfile=UpdateData(User);

exports.ResterictTo= (...roles) => {
    return (req, res, next) => {
        // console.log(roles, req.user.role)
      if (!roles.includes(req.user.role))  throw('your dosent admin')
  
      next();
    };
  };

exports.ChangePassword=CatchAsync(async (req, res,next)=>{
    
            const hash=await bycript.hash(req.body.NewPassword,12)
            await User.findByIdAndUpdate(req.user._id,{Password: hash}).select('+Password');
              
            res.status(200).json({
                status:'succes',
            })
})

exports.RequestJobHandller=CatchAsync(async (req, res, next)=>{
            
            const {PhoneNumber,FristName}= req.body;
            const id = req.query._id;
            if(!PhoneNumber, !FristName) throw ('error phn');
         
            let user
            if(id !== ''){
                user = await User.findById(id)
            }else{

                user= await User.findOne({PhoneNumber:PhoneNumber});
            }
                
                   
            if(!user){
                req.body.Password ='12345678';
                
                 user= await User.create(req.body);
                 if(!user) throw('error')
                 req.body.Objid = user._id;
                 const rd= await Request.create(req.body)
                 const code= await user.CreateRandomPass();
                 user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
                 user.SineupCode = code;
                 await user.save({validateBeforeSave:false})
                //  console.log(code);
                 
                SmsHandller(code, PhoneNumber);
               
            }else{
                req.body.Objid = user._id;
                 const vb= await Request.create(req.body);
            //    token= CreateToken(user._id)
            if(id === ''){
            const code= await user.CreateRandomPass();
            user.ResetePasswordExpires= Date.now( ) + 3 * 60 * 1000;
            user.SineupCode = code;
            await user.save({validateBeforeSave:false})
            SmsHandller(code, PhoneNumber);}
            }
            
            
     
     res.status(200).json({
         status: 'success'
     });
  })

  exports.UpdateDataWithField=  CatchAsync(async (req, res)=>{
    const param= req.params.id;
    

    let usercityarr= [];
        req.body.CitysAndAreas.map(mp=>{
            usercityarr.push(mp.objid)
        })
        // unique Object arr
        req.body.City = usercityarr.filter((elem, index, self) => self.findIndex(
                (t) => {return (t.name === elem.name)}) === index);

    const model= await User.findByIdAndUpdate(param, req.body);

    res.status(200).json({
        status:'success'
    })
});

exports.GetOneUser= CatchAsync(async(req, res)=>{
            const param= req.params.id;
            
            const model = await User.findOne({PhoneNumber: param});

            res.status(200).json({
                status:'success',
                data: model
            })
})


exports.GetAdvisor=CatchAsync(async (req, res, next)=>{

            const advisor = await User.find({$or:[{role: 'employee'}, {role: 'advisor'}]});
             
            let advisorarr = []
             advisor.map(mp=>
              //  &&  mp.CitysAndAreas.name === req.query.CityId
            
              mp.CitysAndAreas.map(mi=> {
                mi.areaName === req.query.area? advisorarr.push(mp):null
            })
            ) 
        //   const advisorareafilter = advisorarea.filter(ln=> ln.length > 0 );
            
            res.status(200).json({
                status:'success',
                data: advisorarr
            }) 
})
