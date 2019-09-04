require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const AssistantV2 = require('ibm-watson/assistant/v2');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

const assistant = new AssistantV2({
    version: process.env.ASSISTANT_VERSION,
    iam_apikey: process.env.ASSISTANT_IAMAPIKEY
});

app.post('/api/assistant', async (req, res) => {
    if (!req.body.session_id) {
        const sessionResponse = await assistant.createSession({
            assistant_id: process.env.ASSISTANT_ID
        });
        console.log(`session_id: ${sessionResponse.session_id}`);
        req.body.session_id = sessionResponse.session_id;
    }
    console.log(`params: ${JSON.stringify(req.body)}`);
    const response = await assistant.message({
        assistant_id: process.env.ASSISTANT_ID,
        session_id: req.body.session_id,
        input: {
            text: req.body.text,
            options: {
                return_context: true,
            }
        },
        context: req.body.context
    });
    response.session_id = req.body.session_id;
    res.json(response);
})

const port = process.env.PORT || '8080';
app.listen(port, () => {
    console.log(`Picard is up and running at port ${port}`);
})
