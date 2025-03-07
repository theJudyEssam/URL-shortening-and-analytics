// The outline of the proj
// 2. URL shortening routes
// 3. Redirecting the shortened URL
// 4. Caching the URLs for improved performance
// 5. Storing the analytics data in the analytics collection

import express from 'express';
import urlRouter from './routes/shortening.js'

const app = express();

app.use("/", urlRouter);


app.listen(3000)

