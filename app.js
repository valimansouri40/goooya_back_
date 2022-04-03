const  express= require('express');
const app = express();
const Auth= require('./RoutesControllers/UserRoutes');
const RealState= require('./RoutesControllers/RealStateRoutes');
const WorkSampel= require('./RoutesControllers/WorkSampelRoutes');
const Request= require('./RoutesControllers/RequestRoutes');
const Filter= require('./RoutesControllers/FilterRoutes');
const Reviwe= require('./RoutesControllers/Reviwe&rateRoutes');

const cors = require('cors')

app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

app.use((req,res,next)=>{
        console.log('middleware')

    next();
})

app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    
}))

 
app.use('/api/v1/worksampel', WorkSampel)
app.use('/api/v1/auth', Auth);
app.use('/api/v1/realstate', RealState);
app.use('/api/v1/request', Request);
app.use('/api/v1/filter', Filter);
app.use('/api/v1/reviwe', Reviwe);


module.exports= app;