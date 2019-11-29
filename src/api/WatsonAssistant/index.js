import axios from 'axios';

const Message = (text, context, session_id) => {
    var API_ROUTE = process.env.NODE_ENV === 'production' ? '/api/assistant' : 'http://localhost:8080/api/assistant';
    return axios.post(API_ROUTE, { text: text, context: context, session_id: session_id })
}

export default {
    Message
};
