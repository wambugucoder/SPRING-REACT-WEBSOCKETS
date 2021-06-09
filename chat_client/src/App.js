import SockJsClient from 'react-stomp';
import React, {Component} from 'react';
import './App.css';
import Login from './Component/Login';
import ChatRoom from './Component/ChatRoom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        messageText: '',
        username: null,
        messages: [],
    }
}

handleMessageReceived=(msg)=>{
 // alert("caa")
 this.setState({messages: this.state.messages.concat(msg)});
    }
addUserToChat=(value)=>{
      this.setState({username:value.toString()})
      this.clientRef.sendMessage("/app/chat.addUser",
      JSON.stringify({sender: value.toString(),  messageType: 'JOIN'}));
    }

handleMessageSend = (value) => {
      this.clientRef.sendMessage("/app/chat.sendMessage",
          JSON.stringify({sender: this.state.username, content:value, messageType: 'CHAT'}));
    //  this.setState({messageText: ''})
  
 }

  render(){
  return (
    <div className="App">
      <SockJsClient url='http://localhost:3000/ws' topics={['/topic/public']}
        onMessage={(msg) => this.handleMessageReceived(msg)}
        ref={(client) => {
        this.clientRef = client
         }}/>

   
    <div className="container">
      {this.state.username===null?
       <Login onSearch={this.addUserToChat} />
      :
      
       <ChatRoom messages={this.state.messages} onChat={this.handleMessageSend}/>
      
     
  }
    </div>
    </div>
  );
        }
}

export default App;
