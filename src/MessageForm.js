import React, { Component } from 'react';
// import socket from './socket'
import firebase from './firebase'
const messages = firebase.database().ref('messages');
const typing = firebase.database().ref('typing');;

class MessageForm extends Component {
  constructor(){
    super();
    this.state = {text: '', typing: ''}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    var message = {
        text : this.state.text,
        user: this.props.user,
        date: date.getHours() + ":" + date.getMinutes()
    }
    messages.push(message)
    // socket.emit('chat message', message);
    this.setState(()=>({
      text: '',
      typing: ''
    }));
  }



  changeHandler(e) {
      this.setState({ text : e.target.value});
    //   socket.emit('user-typing', this.props.user)
    typing.remove()
    typing.push({
      name: this.props.user.nickname,
    });
  }

  _new_typing = (name) => {
    this.setState({typing: name})
  }
  componentWillMount() {
    // socket.on('user-typing-c', this._new_typing);
    typing.on("child_added", function(dataSnapshot) {
        this._new_typing(dataSnapshot.val().name);
    }.bind(this));
  }
  componentWillUnmount(){

  }
  render() {
    const typing = (this.state.typing.length === 0) ? ""  : "" + this.state.typing + " is typing ..."
    return (
      <div>
          <span> {typing} </span>
          <form action="" onSubmit={this.handleSubmit}>
            <input id="m" onChange={this.changeHandler.bind(this)} value={this.state.text}/>
            <button>Send</button>
          </form>
      </div>
    )

  }
}

export default MessageForm
