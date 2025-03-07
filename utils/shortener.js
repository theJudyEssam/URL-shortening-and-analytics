// generate a random 5-digit code from a node library
// i tried import shorturl from node but for some reason it did not work
import { nanoid } from "nanoid";

// this function will take a long url and return a short url in a json object
function shortener(long_url) {

    const shortCode = nanoid(5);
    const shortObject = {   [long_url] : `https://short.url/${shortCode}`  }
    return shortObject;
}

function ensureHttp(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

export { shortener , ensureHttp }

