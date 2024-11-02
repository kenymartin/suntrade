"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const redisClient = redis_1.default.createClient();
(async () => {
    redisClient.connect();
})();
class RedisHelper {
    static async Set(key, values) {
        return new Promise((resolve, reject) => {
            try {
                resolve(!redisClient.exists(key) ?? redisClient.set(key, values));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static async Get(key) {
        return new Promise((resolve, reject) => {
            try {
                resolve(redisClient.get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static async AddToTheList(key, value) {
        return new Promise((resolve, reject) => {
            try {
                resolve(redisClient.lPush(key, value));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static async GeFromTheList(key, start, stop) {
        return new Promise((resolve, reject) => {
            try {
                resolve(redisClient.lRange(key, start, stop));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = RedisHelper;
//# sourceMappingURL=redisHelper.js.map