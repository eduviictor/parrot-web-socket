import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {

    componentWillMount(){
		this.setState({
			ws: new WebSocket('wss://echo.websocket.org')
		})
	}

	static navigationOptions = {
		title: 'Papagaio App',
		headerStyle: {
			backgroundColor: '#FF890C'
		},
		headerTintColor: '#fff',
			headerTitleStyle: {
			fontWeight: 'bold',
		},
	};

	state = {
		ws: null,
		messages: [],
		message: '',
		showAvatar: false
	}

	componentDidMount(){
		this.state.ws.onopen = () => {
			console.log('Conectado!');
		}
		this.state.ws.onmessage = ({ data }) => {
			const parrot = {
				_id: this.state.messages.length,
				text: data,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'Papagaio',
					avatar: 'https://image.freepik.com/vetores-gratis/psittacus-eximius-ilustrado_53876-34993.jpg',
				}
			}
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, parrot),
			}));
		};
	}

	onSend = (messages = []) => {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));	
		this.state.ws.send(this.state.message);
	}

	showAvatar = (user) => {
		// this.setState({ showAvatar: true });
		Alert.alert(user.name);
	}

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                    createdAt: new Date(),
                    text: this.state.message
                }}
                placeholder="Digite uma mensagem para o papagaio..."
                onPressAvatar={(user) => this.showAvatar(user)}
                onInputTextChanged={(text) => this.setState({ message: text })}
                style={styles.chat}
            />
        )
    }
}

const styles = StyleSheet.create({
	chat: {
		flex: 1
	}
});