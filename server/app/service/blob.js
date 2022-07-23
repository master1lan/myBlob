'use strict';

const Service = require('egg').Service;

class BlobService extends Service{
    //插入新的博客
    async insertNewBlob(params){
        const {app}=this;
        try{
            await app.mysql.query('SET NAMES utf8mb4');
            const result=await app.mysql.insert('markdown',params);
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    //通过博客id搜索博客
    async findBlobById(params){
        const {app}=this;
        if(!params||!params._id){
            return null;
        }
        try{
            const result=await app.mysql.get('markdown',params);
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    //所有博客的_id
    async findAllBlobId(){
        const {app}=this;
        try{
            const result=await app.mysql.select('markdown',{
                columns:['_id']
            });
            return result;
        }catch(error){
            console.log('查找所有博客的id时出错了',error);
            return [];
        }
    }
    //所有博客的_id和简短描述
    async recommendBlobs(offset=0){
        const {app}=this;
        try{
            const result=await app.mysql.select('markdown',{
                where:{status:'publish'},
                columns:['_id','description','username','title','last_edit_time'],
                limit:10, //返回的数据量
                offset,
            });
            return result;
        }catch(error){
            return [];
        }
    }
    //个性化查找博客
    async findBlobs(params){
        const {app}=this;
        try{
            const result=await app.mysql.select('markdown',params);
            return result;
        }catch(error){
            return [];
        }
    }
    //用户更新博客
    async updateBlobById(params){
        const {app}=this;
        try{
            let result=await app.mysql.update('markdown',{
                ...params
            },{
                where:{
                    _id: params._id
                }
            });
            return result;
        }catch(error){
            // return error;
            return null;
        }
    }
    //根据id删除博客
    async deleteBlobById(params){
        const {app}=this;
        try{
            let result=await app.mysql.delete('markdown',{
                _id: params._id
            });
            return result;
        }catch(error){
            return error;
        }
    }
}

module.exports=BlobService;