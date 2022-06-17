'use strict';

const Service = require('egg').Service;

const dbconfig = ['token', 'message']

//redis操作
class RedisService extends Service {
    //token存操作
    async setToken(key, value, expir = 60 * 60 * 24) {
        const { redis } = this.app;
        const dbToken = redis.clients.get(dbconfig[0]);
        return await dbToken.set(key, value, 'EX', expir);
    }
    //token取操作
    async getToken(key) {
        const { redis } = this.app;
        const dbToken = redis.clients.get(dbconfig[0]);
        return await dbToken.get(key);
    }
    //自动设置token的一致性
    async OnlyToken(username, uuid, tokenLiveTime) {
        const { app } = this;
        try {
            const hasToken = await this.getToken(username);
            const stillAlive = app.jwt.verify(hasToken);
        } catch (err) {
            const token = app.jwt.sign({
                uuid: uuid,
                username: username,
                exp: Math.floor(Date.now() / 1000) + tokenLiveTime
            }, app.config.jwt.secret);
            await this.setToken(username, token, tokenLiveTime);
        }
        return await this.getToken(username);
    }
}
module.exports = RedisService;