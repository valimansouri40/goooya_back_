exports.CatchAsync= (dt)=>{

    return (req,res,next)=>{
        dt(req,res,next).catch(next);
    }
}