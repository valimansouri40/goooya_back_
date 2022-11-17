const { default: axios } = require('axios');
// const kavenegar ='364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D'

const kavenegar = require('kavenegar').KavenegarApi({
    apikey:'364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D'});

exports.SmsHandller= async(randombyte, PhoneNumber)=>{
    

    // console.log(randombyte)
    kavenegar.VerifyLookup({
        receptor:`${PhoneNumber}`,
        token:`${randombyte}`,
        template: 'goooya'
    },function(res, status){
        console.log(res,randombyte, status)
    })


} 






    // const path = `https://api.kavenegar.com/v1/${kavenegar}/verify/lookup.json`;

   // SmsSend.Send({
    //     message: `کد عبور شما: ${randombyte}
    //     با تشکر، گویا`  ,
    //     sender: "1000596446",
    //     receptor: PhoneNumber
    // },
    //     function(response, status) {
    //         console.log(response, randombyte);
    //         console.log(status)
    //         // if(status !== 200){
    //         //     SmsSend(randombyte, PhoneNumber)
    //         // }
    // });

        // await axios.get(path,{
   
    //     params:{
    //        receptor:PhoneNumber,
    //     token:randombyte,
    //     template: 'goooya' 
    //     },
    // }).then((res)=>console.log(res.data))