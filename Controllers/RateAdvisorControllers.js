const { CatchAsync } = require("../Utils/CatchAsync");
 const RateAdvisor = require("../ModelsControllers/RateAdisor");
const User = require('../ModelsControllers/UserModels');

exports.RateAdvisorPostRate = CatchAsync(async (req, res)=>{
            
            await RateAdvisor.create(req.body);
            
          res.status(200).json({
              status: "succes"
          });
});


exports.GetBestOfAdvisor =CatchAsync(async(req, res)=>{
        let bestOf; 
        if(req.query.limit === 'false'){
          // bestOf = await User.find({$or:[{role: 'employee'}, {role: 'advisor'}]})
          // .sort('-RateAdvisor').limit(4)
          bestOf = await User.find({role: 'advisor'})
          .sort('-RateAdvisor').limit(4)
        }else{
          bestOf = await User.find({role: 'advisor'})
          .sort('-RateAdvisor')
        }
       
        // RateAdvisor:{$gt: 2}
      
        res.status(200).json({
          status: "success",
          data: bestOf
        });
});