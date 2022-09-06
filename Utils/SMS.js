const { default: axios } = require('axios');
const kavenegar ='364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D'


const  SmsHandller= async(randombyte, PhoneNumber)=>{
    const path = `https://api.kavenegar.com/v1/${kavenegar}/verify/lookup.json`;
    // console.log( randombyte, PhoneNumber)

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
    // SmsSend.VerifyLookup({
    //     receptor:`${PhoneNumber}`,
    //     token:`${randombyte}`,
    //     template: 'goooya'
    // },function(res, status){
    //     console.log(res,randombyte, status)
    // })
    await axios.get(path,{
   
        params:{
           receptor:PhoneNumber,
        token:randombyte,
        template: 'goooya' 
        },
    }).then((res)=>console.log(res.data))

} 
// return await axios.post(path,{},{
   
//     params:{
       
//        receptor: 98+""+PhoneNumber,
//     token: randombyte,
//     tamplate: `کد عبور شما: %tokenبا تشکر، گویا`
//     },
// }).then((res)=>res.data)

module.exports=SmsHandller;