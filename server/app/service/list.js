'use strict';

const Service = require('egg').Service;

class ListService extends Service {
    //根据用户名搜索收藏夹
    async findListsByUser(username) {
        const { app } = this;
        try {
            const result = await app.mysql.select('userlist', {
                where: { username },
                columns: ['_id', 'title', 'content', 'last_edit_time']
            });
            return result.map(item=> {return {...item,content:transforArray(item.content)}});
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    //新建收藏夹
    async createList(params) {
        const { app } = this;
        try {
            await app.mysql.query('SET NAMES utf8mb4');
            const result = await app.mysql.insert('userlist', {...params,content:`[]`});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    //删除已有收藏夹
    async deleteList(_id) {
        const { app } = this;
        try {
            const result = await app.mysql.delete('userlist', { _id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    //根据收藏夹id返回收藏文章列表
    async findListByListId(listId){
        const{app}=this;
        try{
            const result= await app.mysql.get('userlist',{_id:listId});
            return {...result,content:transforArray(result.content)};
        }catch(error){
            console.log(error);
            return {content:[]};
        }
    }
    //根据收藏夹id收藏文章id
    async addListById(listId, blobId) {
       const{app}=this;
       try{
        const {content}=await this.findListByListId(listId);
        const result=await app.mysql.update('userlist',{
            content:`${transforArrayAddItem(content,blobId)}`,
            last_edit_time : new Date().toLocaleDateString('fr-CA')
        },{
            where:{_id:listId}
        });
        return result;
       }catch(error){
        console.log(error);
        return null;
       }
    }
    //根据收藏夹id删除文章id
    async removeListById(listId,blobId){
        const {app}=this;
        try{
            const {content}=await this.findListByListId(listId);
            const result=await app.mysql.update('userlist',{
                content:`${transforArrayRemoveItem(content,blobId)}`,
                last_edit_time : new Date().toLocaleDateString('fr-CA')
            },{
                where:{_id:listId}
            });
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    //根据用户名follow某个用户

    //根据用户名取消follow某个用户
}
module.exports = ListService;

function transforArrayAddItem(strList,item){
    const ans=strList.concat(item);
    return '['+ans.map(item=>JSON.stringify(item)).join(',')+']';
};

function transforArrayRemoveItem(strList,item){
    const ans=strList.filter(it=>it!=item).map(item=>JSON.stringify(item)).join(',');
    return '['+ans+']';
};

function transforArray(str){
    let s=str.split('');
    s.shift();s.pop();
    if(s.length<1){
        return s;
    }
    s=s.join('').split(',').map(item=>JSON.parse(item.trim()));
    return s;
}