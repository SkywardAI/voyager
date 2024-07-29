import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';

import buildRoutes from './routes/index.js'

configDotenv()

const app = express();
app.use(cors());
app.use(bodyParser.json());

buildRoutes(app);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`VOYAGER is running on port ${PORT}, happy sailing!`)
})