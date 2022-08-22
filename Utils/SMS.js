const { default: axios } = require('axios');
const kavenegar ='364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D' ;

// const SmsSend= kavenegar.KavenegarApi({
//     apikey: '364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D'
// })


const  SmsHandller= async(randombyte, PhoneNumber)=>{
    const path = `https://api.kavenegar.com/v1/${kavenegar}/sms/send.json`;
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

   return await axios.get(path,{
   
        params:{
            
        sender: "1000596446",
        receptor: PhoneNumber,
        message: `کد عبور شما: ${randombyte}
         با تشکر، گویا`  
        },
    }).then((res)=>console.log(res.data))

}

module.exports=SmsHandller;