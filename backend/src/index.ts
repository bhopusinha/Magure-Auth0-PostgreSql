import app from "./app";
import env from "./config/environment.config";


const PORT = env.app.port || 5000;



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
