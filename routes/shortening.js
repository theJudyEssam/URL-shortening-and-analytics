import express from "express"
import bodyParser from "body-parser"
import {  shorten_logic, redirect_logic } from "../controllers/url_cont.js";
import rateLimiter from "../middleware/ratelimiter.js";

const urlRouter = express.Router();
urlRouter.use(bodyParser.json())
urlRouter.use(bodyParser.urlencoded({ extended: true }))


urlRouter.post("/shorten",rateLimiter, async (req, res)=>{
    const long_url = req.body.long_url;
    try{
       const shorten =  await shorten_logic(long_url);
       console.log(shorten)
       if(shorten != null){
        res.sendStatus(200);
       }
       else{
        res.sendStatus(500)
       }
    }
    catch{
        console.log("error occured from the url /shorten route")
        res.sendStatus(403)
    }
})



urlRouter.get("/:short_code", rateLimiter,async(req, res) =>{
    const short_url = "https://short.url/" + req.params.short_code

    try{
       const long_url = await redirect_logic(short_url)
       console.log(`I am now redirecting you to ${long_url}`);
       res.redirect(long_url)
    }
    catch(error){
        console.log(error.message)
        res.sendStatus(500)
    }
})


export default urlRouter;