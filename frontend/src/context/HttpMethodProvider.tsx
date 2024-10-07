import { createContext, useContext,useCallback, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiResponseType {
  success: boolean;
  errorMsg: string;
  response: object | Array<object>;
}

const createApiErrorResponse = (error: unknown): ApiResponseType => {
  let errorMsg = "Something went wrong";
  if (error instanceof String) {
    errorMsg = error.toString();
  } else if (error instanceof Error) {
    errorMsg = error.message;
  }

  return { success: false, errorMsg, response: [] };
};

export interface contextType {
  showLoder:boolean,  
  get: (endpoint: string) => Promise<ApiResponseType>;
  post: (
    endpoint: string,
    data: object | Array<object>
  ) => Promise<ApiResponseType>;
  patch: (
    endpoint: string,
    data: object | Array<object>
  ) => Promise<ApiResponseType>;
  deleteMe: (endpoint: string) => Promise<ApiResponseType>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const httpContext = createContext<contextType | null>(null);

const HttpMethodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    
    const [showLoder,setShowLoader]=useState(false);

    const get = useCallback(async (endpoint:string):Promise<ApiResponseType>=>{
      
        return api.get(endpoint).then((res)=>{
            return {
               success:true,
               errorMsg:"",
               response:res.data
            }
        }).catch((err)=>{
            return createApiErrorResponse(err);
        }).finally(()=>{
            setShowLoader(false);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showLoder]);
    
    const post = useCallback(async (endpoint:string,data:object|Array<object>):Promise<ApiResponseType>=>{
      
        return api.post(endpoint,data).then((res)=>{
            return {
               success:true,
               errorMsg:"",
               response:res.data
            }
        }).catch((err)=>{
            return createApiErrorResponse(err);
        }).finally(()=>{
            setShowLoader(false);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showLoder]);
    
    const patch = useCallback(async (endpoint:string,data:object|Array<object>):Promise<ApiResponseType>=>{
      
        return api.patch(endpoint,data).then((res)=>{
            return {
               success:true,
               errorMsg:"",
               response:res.data
            }
        }).catch((err)=>{
            return createApiErrorResponse(err);
        }).finally(()=>{
            setShowLoader(false);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showLoder]);
    
    const deleteMe = useCallback(async (endpoint:string):Promise<ApiResponseType>=>{
      
        return api.delete(endpoint).then((res)=>{
            return {
               success:true,
               errorMsg:"",
               response:res.data
            }
        }).catch((err)=>{
            return createApiErrorResponse(err);
        }).finally(()=>{
            setShowLoader(false);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showLoder]);


    const value:contextType = {
        showLoder,
        get,
        post,
        patch,
        deleteMe
    }


  return <httpContext.Provider value={value}>{children}</httpContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHttpMethodContext = () => {
  const context = useContext(httpContext) as contextType;

  if (!context) {
    console.log("context must use inside the Provider!");
  }

  return context;
};

export default HttpMethodProvider;
