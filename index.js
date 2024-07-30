import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';

import buildRoutes from './routes/index.js'

import swStats from 'swagger-stats';

configDotenv()

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(swStats.getMiddleware({
    name: "Voyager Swagger Monitor"
}))

buildRoutes(app);

const PORT = process.env.PORT || 8000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`VOYAGER is running on port ${PORT}, happy sailing!`)
})