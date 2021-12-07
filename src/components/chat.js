import React, { Component } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from 'axios';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Map, List, Record } from 'immutable';
import moment from 'moment';

const API_GATEWAY_ID = "x80w7v7lf1"
const SOCKET_API_GATEWAY_ID = "d7emme8ql1"

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: Map(
            {
                messageList: [],
                messages: []
            })
        }
        this.websocket = undefined;
        this.timer = undefined;
    }

    closeWebSocket = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
    }

    // room id is combination with two user's 
    connectToWebScoket = (room_id) => {
        var user_id = 'test'
        const address = `wss://${SOCKET_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev?user_id=${user_id}&room_id=${room_id}`
        this.websocket = new WebSocket(address);
        this.websocket.onopen = () => {
            console.log("open")
            this.timer = setInterval(() => {
            this.websocket.send(JSON.stringify({ message: 'ping' }));
            }, 60 * 1000);
        };
        
        this.websocket.onmessage = (message) => {
            let obj = JSON.parse(message.data);
            this.onMessageReceived(obj);
        };
        
        this.websocket.onclose = (event) => {
            console.log('onclose');
            if (this.timer || this.websocket) this.closeWebSocket();
        };

        this.websocket.onerror = (event) => {
            console.error('WebSocket error observed:', event);
            if (this.timer || this.websocket) this.closeWebSocket();
        };
    }

    componentDidMount = async () => {
        const { data } = this.state;
        var room_id = 'test'
        const result = await axios({
            method: 'GET',
            url: `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/chat`,
            params: {
                room_id: room_id
            }
        });;
        this.setState({
            data: data.set("messages", result.data).set("user_id", moment().valueOf())
        })
        this.connectToWebScoket(room_id);
    }

    onMessageReceived = async (message) => {
        console.log(message)
        if (message.timestamp) {
            const { data } = this.state;
            let list = data.get("messages");
            list.push(message)
            this.setState({
                data: data.set("messages", list)
            })
        }
    }

    onSend = async (message) => {
        const { data } = this.state;
        console.log(data.get("user_id"))
        const result = await axios({
            method: 'PUT',
            url: `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/chat`,
            data: {
                room_id: "test", // Generate the room id
                text: message,
                user_id: data.get("user_id"), // Put current user id
                name: "name_test" // Put current user email
            }
        });;
    }

    getMessageList = () => {
        const { data } = this.state;
        const userId = data.get("user_id");
        let messageList = [];
        data.get("messages").forEach((message) => {
            messageList.push(<Message
                    key={message.timestamp}
                    model={{
                        message: message.message,
                        sentTime: Date.now().toString(),
                        sender: "Hyoeun",
                        direction: (userId == message.user_id) ? "outgoing" : "incoming",
                    }}
                />
            );
        })
        return messageList;
    }
    
    render() {
        return (
            <div style={{ position: "relative", height: "500px" }}>
                <MainContainer>
                <ChatContainer>
                    <MessageList>
                    {this.getMessageList()}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={this.onSend} />
                </ChatContainer>
                </MainContainer>
            </div>
        );
    }
}