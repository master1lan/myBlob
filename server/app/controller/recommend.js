'use strict';

const Controller = require('egg').Controller;
/**
 * 推荐系统接口页
 */

class RecommendController extends Controller{
    async GetBlobsRecommend(){
        const{ctx}=this;
        const { recommendNum=3 } = ctx.request.query;
        const res=await ctx.service.recommend.findRandNBlob(recommendNum);
        const RecommendBlob=await Promise.all(res.map(async(blob)=>{
            const {logoUrl,username}=await ctx.service.user.getUserByName(blob.username);
            return {logoUrl,username,_id:blob._id,title:blob.title};
        }));
        ctx.body={
            blobs:RecommendBlob
        }
    }
    async GetUsersRecommend(){
        const{ctx}=this;
        const { recommendNum=3 } = ctx.request.query;
        const RecommendUserArr=await ctx.service.recommend.findRandNUser(recommendNum);
        ctx.body={
            users:RecommendUserArr
        }
    }
   
}

module.exports=RecommendController;

