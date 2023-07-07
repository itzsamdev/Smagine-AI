require('dotenv').config()
const PORT = 8000 || process.env.SERVER_PORT;

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))



const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/images", async (req, res) => {
    try {
        const { prompt, n } = req.body
        const response = await openai.createImage({
            prompt: prompt,
            n: n,
            size: "512x512",
        });
        // console.log(response)
        res.status(200).send(response.data);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})