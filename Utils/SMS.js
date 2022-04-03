const kavenegar = require('kavenegar');

const SmsSend= kavenegar.KavenegarApi({
    apikey: '364844374736646A5973517974766D387A38476938464D306A4A51693373484D76723232434F384F49366F3D'
})

const SmsHandller=(randombyte, PhoneNumber)=>{
    console.log( randombyte, PhoneNumber)

    SmsSend.Send({
        message: " : کد تایید هویت شما " + randombyte,
        sender: "1000596446",
        receptor: PhoneNumber
    },
        function(response, status) {
            console.log(response);
            console.log(status)
    });
}

module.exports=SmsHandller;