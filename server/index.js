const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
// const path = require('path');
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const chatAPIKey = process.env.CHATGPT_API_KEY;
// const sslRedirect = require('heroku-ssl-redirect');

const configuration = new Configuration({
    organization: "org-OopekGf8qFEOTNI3a5ES7fI5",
    apiKey: chatAPIKey
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json())
app.use(cors())

//remove if not working
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// app.use(sslRedirect());

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