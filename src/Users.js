import React from 'react';

class User extends React.Component{
  render() {
      return (
              <li>{this.props.user.nickname}</li>
      );
  }
}

class Users extends React.Component{
  render() {
      return (
          <div className="users">
          <h1> Online Users </h1>
          <ul id='messages'>
              {
                  this.props.users.map((user, i) => {
                      return (
                          <User
                              key={i}
                              user={user}
                          />
                      );
                  })
              }
          </ul>
          <hr/>
          </div>
      );
  }
};

export default Users
