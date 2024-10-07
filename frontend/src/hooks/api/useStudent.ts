import { ApiResponseType, useHttpMethodContext } from "../../context/HttpMethodProvider"



const useStudent = ()=>{
  
    const {get,post}=useHttpMethodContext();
   
    const getStudent =  async (endpoint:string):Promise<ApiResponseType>=>{
       
        const response = await get(endpoint);

       return response;

    }


    const createStudent = async (endpoint:string,data:object|Array<object>):Promise<ApiResponseType>=>{
        const response = await post(endpoint,data);

        return response;
    }
    


    return {getStudent,createStudent}

}



export default useStudent;