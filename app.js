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


app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true,limit: '50mb'}));

app.use((req,res,next)=>{
        console.log('middleware')

    next();
})

app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true
}))

app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
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


module.exports= app;