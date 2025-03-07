// for the logic of the url shortening
// basically this will take the url and it will call the shortener function and add the url to the databases
import { pool } from "../config/database.js";
import { shortener, ensureHttp } from "../utils/shortener.js";
import redis from "../config/redis.js"


async function shorten_logic(long_url){
    const http_url = ensureHttp(long_url)
    const shortened = shortener(http_url);

    try{
        await pool.query('INSERT INTO urls ("long-url", "short-url") VALUES ($1, $2)', [http_url, shortened[http_url]])
        return shortened
    }
    catch(error){
        console.log("An error occured in shorten_logic function: " + error.message)
    }
}

async function redirect_logic(short_url){
    //first we should check if it exists in the cache first or not then 
    //if not we will check to see if it is in the primary database or not
    try{

        const cached_url = await redis.get(short_url);
        if(cached_url) {
            console.log("Bloody hell! this is a cache HIT!!");
          //  console.log("what we found from redis: " + cached_url)
            return cached_url
        }

        console.log('God damn! This is a cache MISS!')
        const query = await pool.query('SELECT * FROM urls WHERE "short-url" = $1', [short_url])

        if(query.rows.length == 0){
            return "false"
        }


        const long_url =  query.rows[0]["long-url"]
        await redis.setex(short_url, 86400, long_url)

       // console.log(query.rows[0]["long-url"])
        return long_url;
    }
    catch{
        console.log("an error hath occured from the redirect_logic function")
    }
}

//redirect_logic("https://short.url/UTQGS")
 

export { shorten_logic , redirect_logic}