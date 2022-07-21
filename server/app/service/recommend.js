'use strict';

const Service = require('egg').Service;

class RecommendService extends Service {
    //随机选择n位用户，返回其名字和uuid
    async findRandNUser(num = 3) {
        const { app } = this;
        try {
            const arr = await app.mysql.query(`SELECT uuid,username FROM user as t1  WHERE
            t1.uuid>=(RAND()*(SELECT MAX(uuid) FROM user)) LIMIT ${num}`);
            
            return arr;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findRandNBlob(num = 3) {
        const { app } = this;
        try {
            const ans = await app.mysql.query(`SELECT _id,title,description,username FROM markdown as t1  WHERE status='publish' 
            AND t1._id>=(RAND()*(SELECT MAX(_id) FROM markdown)) LIMIT ${num}`);
            return ans;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = RecommendService;