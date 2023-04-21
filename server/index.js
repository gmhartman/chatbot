const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const chatAPIKey = process.env.chatAPIKey;

const configuration = new Configuration({
    organization: "org-OopekGf8qFEOTNI3a5ES7fI5",
    apiKey: chatAPIKey
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message, 'message')
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      res.json({
        message: response.data.choices[0].text,
      })
})

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});