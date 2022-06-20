import middleware from "@utils/middleware";

export default async function Middleware(req){
    return await middleware(req);
    // return await req;

}