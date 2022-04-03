const dotenv= require('dotenv');
const mongoose= require('mongoose');
const app= require('./app');

dotenv.config({path:'./config.env'});
mongoose.connect(process.env.LOCAL_DATABASE,{
    // useCreateIndex: true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('connect mongoose')).catch((e)=>console.log(e));

const port= process.env.PORT|| 8000;
app.listen(port,()=>{
    console.log( `app connect port = ${port}`)
})