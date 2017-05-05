import React from 'react';
// import socket from './socket'
// import firebase from './firebase'

let Message = props => (<li><b>{props.user}</b> <i>{props.date}</i>:   <span className="text">{props.message}</span></li>)

// const messages = firebase.database().ref('messages');

class MessageList extends React.Component{

  // state = { messages: [] }

  // componentWillMount() {
  //   messages.on("child_added", function(dataSnapshot) {
  //       this._messageRecieve({text: dataSnapshot.val().text, user: dataSnapshot.val().user.nickname});
  //   }.bind(this));
  // }

  // _messageRecieve = (message) => {
  //     var {messages} = this.state;
  //     messages.push(message);
  //     this.setState({messages});
  // }

  render() {
    return (
      <ul id='messages'>
          {
            this.props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        message={message.text}
                        user={message.user}
                        date={message.date}
                    />
                );
            })
          }
      </ul>
    );
  }
};

export default MessageList
