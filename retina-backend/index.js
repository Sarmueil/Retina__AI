import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './mongoDB/connect.js';
import postRoute from './routes/postRoute.js';
import generateImage from './routes/generateImage.js'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/generateimage', generateImage);

app.get('/', async (req, res) => {
    res.send('Hello from the backend');
})

const server = async () => {
    try {
        connectToDB(process.env.MONGODB_URL)
        app.listen(4000, () => console.log('server has started on port http://localhost:4000'))
    } catch (err) {
        console.log(err)
    }
}

server(); 