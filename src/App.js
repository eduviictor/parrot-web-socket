import React, {Component} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import GiftedChat from './components/Chat/Chat';

class App extends Component {

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

	render() {
		return (
			<View style={styles.container}>
				<GiftedChat />
			</View>
		);
	}
}

const AppNavigator = createStackNavigator({
	Home: App
});
  

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	}
});

export default createAppContainer(AppNavigator);