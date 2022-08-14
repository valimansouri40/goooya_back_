const  express= require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const Auth= require('./RoutesControllers/UserRoutes');
const RealState= require('./RoutesControllers/RealStateRoutes');
const WorkSampel= require('./RoutesControllers/WorkSampelRoutes');
const Request= require('./RoutesControllers/RequestRoutes');
const Filter= require('./RoutesControllers/FilterRoutes');
const Reviwe= require('./RoutesControllers/Reviwe&rateRoutes');
const Appointment= require('./RoutesControllers/AppointmentRoutes');
const Mark = require('./RoutesControllers/MarkRoutes');
const RateAd = require('./RoutesControllers/RateAdvisor');
 const fs = require('fs');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true,limit: '50mb'}));
app.use((req,res,next)=>{
  
  console.log('middleware',)
  // fs.readdirSync('public/img').forEach(file => {
  //   fs.unlinkSync(`public/img/${file}`);
  // });
  //  console.log(fs.existsSync('public/img/realstate-6221006221000-1.jpeg'))
    next();
})

app.use(cors({
  origin: "*", 

    // process.env.CLIENT_URL, 
    credentials:true
}))

app.use(express.static('public/img'))
app.use(helmet());



// Limit requests from same API
const limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


app.use(mongoSanitize());


app.use(xss());

 
app.use('/api/v1/worksampel', WorkSampel)
app.use('/api/v1/auth', Auth);
app.use('/api/v1/realstate', RealState);
app.use('/api/v1/request', Request);
app.use('/api/v1/filter', Filter);
app.use('/api/v1/reviwe', Reviwe);
app.use('/api/v1/appointment', Appointment);
app.use('/api/v1/Mark', Mark);
app.use('/api/v1/RateAdvisor', RateAd);


module.exports= app;
// 6.2.4