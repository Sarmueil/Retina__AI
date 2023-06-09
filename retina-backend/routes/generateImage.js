import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

dotenv.config()

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: "b64_json"
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image })
    } catch (err) {
        const errorMessage = err?.response?.data?.error?.message;
        if (errorMessage) {
            res.status(400).send(errorMessage);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

export default router;
