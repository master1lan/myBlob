import api from "@utils/api";


export const jwtLogin=async(req)=>{
    const jwt=req.cookies['jwt'];
    const info=await fetch(api.userLoginWithjwt,{
        headers:{
            'Authorization':jwt
        }
    });
    const json=await info.json();
    if(json.code!==200){
       return false;
    }
    return true;
}