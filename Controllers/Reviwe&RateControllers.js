const Rate = require("../ModelsControllers/RateModels");

const { CatchAsync } = require("../Utils/CatchAsync");
const { PostData } = require("./FactoryControllers");


exports.ReviwePostsAddData=CatchAsync(async (req, res, next)=>{

        req.body.UserId = req.user._id;
        next();

})

exports.ReviwePosts= PostData(Rate);

exports.ReviweGet= CatchAsync(async (req, res)=>{
        const param= req.params.id;
            const reviwe= await Rate.find({RealStateId: param});

        res.status(200).json({
            status:'success',
            data: reviwe
        })
})


