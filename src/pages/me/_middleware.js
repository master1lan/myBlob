import middleware from "@utils/middleware";

export default async function(req){
    return await middleware(req);
}