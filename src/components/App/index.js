import React from 'react';

// Style
import './index.css';

// App Components
import Message from '../Message/';

// API Services
import WatsonAssistant from '../../api/WatsonAssistant/';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '', history: [], context: null, session_id: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.sendMessage();
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSendMessage = (e) => {
    e.preventDefault();
    if (this.state.message && this.state.message.length > 0) {
      this.state.history.push({ from: 'user', message: this.state.message, response_type: 'text' });
      this.sendMessage(this.state.message, this.state.context, this.state.session_id);
      this.setState({ message: '' });
    }
  }

  sendMessage = (text, context, session_id) => {
    WatsonAssistant.Message(text, context, session_id)
      .then(response => {
        this.setState(state => {
          const history = response.data.output.generic.map(m => {
            if (m.response_type === 'text') return { from: 'watson', message: m.text, response_type: m.response_type };
            if (m.response_type === 'image') return { from: 'watson', source: m.source, response_type: m.response_type };
            return { from: 'watson', message: 'Format not supported', response_type: 'text' };
          });
          state.history.push.apply(state.history, history);
          return { message: '', history: state.history, context: response.data.context, session_id: response.data.session_id };
        });
      });
  }

  render() {
    const { history } = this.state;
    return (
      <div className='container'>
        <div className='box'>
          <div className='chat'>
            <div className='chat-history'>
              {
                history.map((object, i) => (
                  <Message index={i} object={object} />
                ))
              }
            </div>
            <div className='input-form'>
              <form onSubmit={this.handleSendMessage}>
                <input type='text' value={this.state.message} onChange={this.handleChange}></input>
                <button><FontAwesomeIcon icon={faPaperPlane} size='lg' /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
