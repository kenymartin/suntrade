// import { hostname } from 'os';
// import redis from 'redis';
// const client = redis.createClient({
 
// });
 
import Redis from 'ioredis';
const redis = Redis.createClient();
redis.on('error', (err) => {
    console.log('Redis Client Error', err);
});
redis.on('connect', () => {
    console.log('Redis Client Connected');
}
);
redis.on('ready', () => {
    console.log('Redis Client Ready');
}
);
