const expressasynchandler= require('express-async-handler');
const axios = require('axios').default;
require('dotenv').config();

class MpesaController {

    async getOAuthToken(req,res,next){
        let consumer_key = process.env.consumer_key;
        let consumer_secret = process.env.consumer_secret;

        let url = process.env.oauth_token_url;
        //form a buffer of the consumer key and secret
        let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;

        try{

            let {data} = await axios.get(url,{
                "headers":{
                    "Authorization":auth
                }
            });

            req.token = data['access_token'];

            return next();

        }catch(err){

            return res.send({
                success:false,
                message:err.message
            });

        }  
    };


async lipaNaMpesaOnline(req,res){
    let token = req.token;
    let auth = `Bearer ${token}`;
    let url = process.env.lipa_na_mpesa_url;
    const{total, phone}=req.body;
    //let timestamp = require('./Mpesatimestamp').timestamp;
    //let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";

    //getting the timestamp
     //   let passkey = process.env.lipa_na_mpesa_passkey;
    ///let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
    //let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";
    
    try {
        const {data} = await axios.post(url,{    
            "BusinessShortCode":"174379",    
            "Password": process.env.lipa_na_mpesa_password,    
          "Timestamp":"20160216165627",    
          "TransactionType": "CustomerPayBillOnline",    
            "Amount":total,    
           "PartyA":phone,    
            "PartyB":"174379",    
          "PhoneNumber":phone,    
          "CallBackURL":"https://mydomain.com/pat",    
          "AccountReference":"Test",    
          "TransactionDesc":"Test"
         },{
            "headers":{
                "Authorization":auth
            }
        }).catch(console.log);
        return res.send({
            success:true,
            message:data.CustomerMessage
        });

    }catch(err){

        return res.send({
            success:false,
            message:err.message
        });

    };
};
lipaNaMpesaOnlineCallback(req,res){

    //Get the transaction description
    let message = req.body.Body.stkCallback['ResultDesc'];

    return res.send({
        success:true,
        message
    });
    
};

};

module.exports = new MpesaController()