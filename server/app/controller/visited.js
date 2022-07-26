'use strict';
const Controller = require('egg').Controller;
class VisitedController extends Controller{
    //获取对方发表文章列表
    async findPublishBlobById(){
        const {ctx}=this;
        const {id}=ctx.request.query;
        const result=await ctx.service.blob.findBlobs({
            where:{username:id,status:'publish'},
            columns: ['username', 'title', '_id', 'description', 'status', 'last_edit_time']
        });
        ctx.body={
            code:200,
            data:result
        };
    }
}
module.exports=VisitedController;