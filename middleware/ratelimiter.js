//this will be the middleware for rate-limiting, to ensure 
// the rates.....are not limited ? 

import redis from "../config/redis.js";

const rateLimiter = async (req, res, next)=> {
    const ip = req.ip;
    const limit = 5;
    const redisKey = `rate_limit:${ip}`;
    const expiration = 60;
    console.log(ip)

    try{

        const requests = await redis.incr(redisKey);

        if(requests == 1 ){
            // we will set an expiration time for each client
            await redis.expire(redisKey, expiration);
        }

        if(limit < requests){
            return res.status(429).json({ message: 'Too Many Requests' });
        }

        next();

    }
    catch(e){
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

export default rateLimiter;