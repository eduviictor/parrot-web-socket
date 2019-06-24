import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class App extends Component {

	componentWillMount(){
		this.setState({
			ws: new WebSocket('wss://echo.websocket.org')
		})
	}

	state = {
		ws: null,
		messages: [],
		message: ''
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
					name: 'Parrot',
					avatar: 'https://image.freepik.com/vetores-gratis/psittacus-eximius-ilustrado_53876-34993.jpg',
				}
			}
			console.log(data);
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
		console.log('enviei')
	}

	render() {
		// console.log(this.state.message)
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: 1,
					createdAt: new Date(),
					text: this.state.message
				}}
				onInputTextChanged={(text) => this.setState({ message: text })}
				style={styles.container}
				// text={this.state.messages}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	chat: {
		flex: 1,
		width: 100,
		height: 100
	}
});
