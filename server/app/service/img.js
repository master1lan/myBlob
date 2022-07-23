'use strict';

const Service = require('egg').Service;

class ImgService extends Service{
    //查询hash值
    async findHashIsInlucde(hashString){
        const {app}=this;
        try{
            const result=await app.mysql.get('hash',{
                hashcode:hashString
            });
            return result!=null;
        }catch(err){
            console.log(error);
            return false;
        }
    }
    //保存hash值
    async insertNewHash(hashString){
        const {app}=this;
        try{
            await app.mysql.query('SET NAMES utf8mb4');
            await app.mysql.insert('hash',{
                hashcode:hashString
            });
        }catch(err){
            console.log(err);
        }
    }
    //删除hash值
    async deleteHash(hashString){
        const {app}=this;
        try{
            await app.mysql.delete('hash',{
                hashcode:hashString
            });
        }catch(err){
            console.log(err);
        }
    }

}

module.exports=ImgService;