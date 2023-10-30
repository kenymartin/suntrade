import Redis from "redis";
const redisClient = Redis.createClient();
(async () => {
  redisClient.connect();
})();

export default class RedisHelper {
  static async Set(key: any, values: any[] | any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {

        resolve(!redisClient.exists(key) ?? redisClient.set(key, values));
      } catch (error) {
        reject(error)
      }
    });
  }
  static async Get(key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(redisClient.get(key))
      } catch (error) {
        reject(error)
      }
    });
  }
  static async AddToTheList(key: any,value:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(redisClient.lPush(key,value))
      } catch (error) {
        reject(error)
      }
    });
  }
  static async GeFromTheList(key: any,start:any, stop:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(redisClient.lRange(key,start,stop))
      } catch (error) {
        reject(error)
      }
    });
  }
}
