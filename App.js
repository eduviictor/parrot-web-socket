import React, {Component} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
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
			<View style={styles.container}>
				<GiftedChat
					messages={this.state.messages}
					onSend={(messages) => this.onSend(messages)}
					user={{
						_id: 1,
						createdAt: new Date(),
						text: this.state.message
					}}
					placeholder="Mensagem..."
					onPressAvatar={(user) => this.showAvatar(user)}
					onInputTextChanged={(text) => this.setState({ message: text })}
					style={styles.chat}
					
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
