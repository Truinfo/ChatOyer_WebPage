//import axiosIntance from "../helpers/axios"
import { toast } from "react-toastify"
import axios from "../helpers/axios"
import { authConstants } from "./constants"



 

export const login=(user)=>{

    console.log(user)

    return async (dispatch)=>{

        dispatch({type:authConstants.LOGIN_REQUEST});


        const res=await axios.post('/signin',{
            ...user       
        })
        if (res.status===200){
            const {token,user}=res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            toast.success("LOGIN_SUCCESS")
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
            }
    })

    }else{
    if(res.status===400){
        dispatch({
            type:authConstants.LOGIN_FAILURE,
            payload:{error:res.data.error}
        })
    }

}
        
    }
 }

 
export const isUserLoggedIn=()=>{
    return async dispatch=>{
       const token=localStorage.getItem('token');
       if(token){
        const user=JSON.parse(localStorage.getItem('user'));
        dispatch({
            type:authConstants.LOGIN_SUCCESS,
            payload:{
                token,user
        }
});
}else{
    dispatch({
        type:authConstants.LOGIN_FAILURE,
        payload:{error:'failed to logged in'}
    })
} 
    }
 }
 export const signout=()=>{
    return async dispatch =>{
        
        dispatch({
            type:authConstants.LOGOUT_REQUEST
        });
        const res=  await axios.post(`/signout`);
        if (res.status===200){
            localStorage.clear();
            toast.success("LOGOUT_SUCCESS")
            dispatch({
                type:authConstants.LOGOUT_SUCCESS
                
            });

        }else{
            dispatch({
                type:authConstants.LOGOUT_FAILURE,
                payload:{error:res.data.error}
            });
        }

        
    }
 }