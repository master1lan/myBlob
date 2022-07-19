'use strict';

const Controller = require('egg').Controller;
/**
 * 推荐系统接口页
 */

class RecommendController extends Controller{
    //首页右侧栏推荐，包括三个人的三篇文章，还有随机三个人
    async GetHomeRecommend(){
        const{ctx}=this;
        const RecommenduserArr=await ctx.service.recommend.findRandNUser(3);
        const RecommendBlob=await ctx.service.recommend.findRandNBlob(3);
        ctx.body={
            users:RecommenduserArr,
            blobs:RecommendBlob
        }
    }
    //详细个人列表推荐
    async GETUserRecommend(){
        const {ctx}=this;
        const {username}=ctx.request.body;
        if(!username){
            return;
        }

    }
}

module.exports=RecommendController;

