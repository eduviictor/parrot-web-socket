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

	render() {
		// console.log(this.state.message)
		return (
			<View style={styles.container}>
				<GiftedChat
					messages={this.state.messages}
					onSend={(messages) => this.onSend(messages)}
					user={{
						_id: 1,
						createdAt: new Date(),
						text: this.state.message
					}}
					onInputTextChanged={(text) => this.setState({ message: text })}
					style={styles.chat}
					// text={this.state.messages}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	chat: {
		flex: 1
	}
});
