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
    try {
        if (!req.body.session_id) {
            req.body.session_id = await generateNewSession();
        }
        console.log(`params: ${JSON.stringify(req.body)}`);
        const response = await sendMessage(req.body);
        res.json(response);
    } catch (e) {
        console.log(`throw an error: ${e.message}`);
        if (e.code === 404) {
            req.body.session_id = await generateNewSession();
            console.log(`params: ${JSON.stringify(req.body)}`);
            const response = await sendMessage(req.body);
            res.json(response);
        }
    }
});

generateNewSession = async () => {
    const sessionResponse = await assistant.createSession({
        assistant_id: process.env.ASSISTANT_ID
    });
    console.log(`session_id: ${sessionResponse.session_id}`);
    return sessionResponse.session_id;
}

sendMessage = async (body) => {
    const response = await assistant.message({
        assistant_id: process.env.ASSISTANT_ID,
        session_id: body.session_id,
        input: {
            text: body.text,
            options: {
                return_context: true,
            }
        },
        context: body.context
    });
    response.session_id = body.session_id;
    return response;
}

const port = process.env.PORT || '8080';
app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
