import { NextResponse } from "next/server";
import api from "@utils/api";
export default async function middleware(req) {
    const jwt=req.cookies['jwt'];
    const info=await fetch(api.userLoginWithjwt,{
        headers:{
            'Authorization':jwt
        }
    });
    const json=await info.json();
    if(json.code!==200){
        const url=req.nextUrl.clone();
        url.pathname='login';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}