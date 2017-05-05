import React from 'react';
import './style.css'
// import socket from './socket'
import firebase from './firebase'

import MessageForm from './MessageForm'
import Users from './Users'
import MessageList from './MessageList'

const users_ref = firebase.database().ref('users');
const messages_ref = firebase.database().ref('messages');

class App extends React.Component {
    constructor() {
        super();
        this.state = { user: '', users: [], messages: [{}], text: '', typing: '' }
    }

    componentDidMount() {
        var nickname = prompt("Please enter your nickname", "Jane Doe");

        let user = users_ref.push();
        let user_key = user.key;
        user.set({
            nickname
        }, function(dataSnapshot) {
            this.setState({
                user: { key: user_key, nickname }
            });
        }.bind(this))

        //const userListRef = firebase.database().ref("USERS_ONLINE");
        // const myUserRef = userListRef.push();

        // Monitor connection state on browser tab
        firebase.database().ref(".info/connected")
            .on(
                "value",
                function(snap) {
                    if (snap.val()) {
                        // if we lose network then remove this user from the list
                        user.onDisconnect().remove();
                    }

                }
            );
        users_ref.on("child_added", function(dataSnapshot) {
            this._userJoined({ key: dataSnapshot.key, nickname: dataSnapshot.val().nickname });
        }.bind(this));

        users_ref.on("child_removed", function(dataSnapshot) {
            // this._userLeft(dataSnapshot.val().nickname);
            this._userLeft(dataSnapshot.key);
        }.bind(this));

        messages_ref.on("child_added", function(dataSnapshot) {
            this._messageRecieve({text: dataSnapshot.val().text, user: dataSnapshot.val().user.nickname, date: dataSnapshot.val().date});
        }.bind(this));

        //   socket.emit('send-nickname', nickname);
        //   socket.on('user connected', this._userJoined.bind(this));
        //   socket.on('disconnected', this._userLeft.bind(this));
        // socket.on('change:name', this._userChangedName);
    }

    _messageRecieve = (message) => {
        var {messages, users, user} = this.state;
        messages.push(message);
        this.setState({messages, users, user});
    }

    componentWillUnmount() {
    }

    _userJoined(data) {
        var { users, messages, user } = this.state;
        users.push(data);
        const date = new Date()
        messages.push({
            user: 'APPLICATION',
            text: data.nickname + ' Joined',
            date: date.getHours() + ":" + date.getMinutes()
        });
        this.setState({ users, messages, user });

    }

    _userLeft(name) {
        var { users, messages, user } = this.state;
        var index = users.indexOf(name);
        users.splice(index, 1);
        const date = new Date()
        messages.push({
            user: 'APPLICATION',
            text: this.state.user.nickname + ' Left',
            date: date.getHours() + ":" + date.getMinutes()
        });
        this.setState({ users, messages, user });
    }
    render() {
        const user = (this.state.user) ? "Welcome " +  this.state.user.nickname : "";
        return ( < div >
            <h1 className="header"> {user} </h1>
            <hr />
            < Users users={ this.state.users }
            /> < hr / >
            < MessageList messages={this.state.messages}/ >
            < MessageForm user={ this.state.user }
            /> < /div>
        )
    }
}
export default App
