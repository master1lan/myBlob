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
    //搜索博客
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
    async findAllBlob(){
        const {app}=this;
        try{
            const result=await app.mysql.select('markdown',{});
            return result;
        }catch(error){
            return [];
        }
    }
}

module.exports=BlobService;