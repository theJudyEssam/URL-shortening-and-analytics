// this will be for setting up redis

import Redis from "ioredis"


const redis = new Redis({
    host: '127.0.0.1', 
    port: 6379
});

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.error("Redis Error", err))


export default redis;