import React from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: "", history: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSendMessage = (e) => {
    e.preventDefault();
    if (this.state.message && this.state.message.length > 0) {
      this.state.history.push({ from: "user", message: this.state.message });
      this.setState({ message: "" });
      // TODO: Send message to API
    }
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="chat">
            <div className="chat-history">
              {
                this.state.history.map((object, i) => (
                  <div key={i} className={[object.from === "user" ? "from from-user" : "from from-watson", i === 0 ? "first" : ""].filter(e => !!e).join(' ')}>
                    <p>{object.message}</p>
                  </div>
                ))
              }
            </div>
            <div className="input-form">
              <form onSubmit={this.handleSendMessage}>
                <input type="text" value={this.state.message} onChange={this.handleChange}></input>
                <button><FontAwesomeIcon icon={faPaperPlane} size="lg" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
