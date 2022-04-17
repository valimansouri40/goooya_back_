const Rate = require("../ModelsControllers/RateModels");

const { CatchAsync } = require("../Utils/CatchAsync");
const { PostData, GetLimitData, UpdateData, DeleteOneData } = require("./FactoryControllers");


exports.ReviwePostsAddData=CatchAsync(async (req, res, next)=>{

        req.body.UserId = req.user._id;
        next();

})

exports.ReviwePosts= PostData(Rate);

exports.ReviweGet= GetLimitData(Rate);
exports.ReviewPatch= UpdateData(Rate);
exports.Reviewdl= DeleteOneData(Rate);
