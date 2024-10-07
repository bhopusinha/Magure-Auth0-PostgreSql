import dotenv from 'dotenv';

dotenv.config();


export default {
    app:{
       port : process.env.PORT
    },
    auth0:{
        secret:process.env.SECRET,
        baseURL:process.env.BASEURL,
        clientID:process.env.CLIENTID,
        issuerBaseURL:process.env.ISSUERBASEURL
    }
}