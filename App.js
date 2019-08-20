import React from 'react';
import TodoList from './pages/TodoList';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as Font from 'expo-font';

const AppNavigator = createStackNavigator({
  Home: TodoList
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    return <AppContainer />;
  }
}