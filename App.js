import React from 'react';
import TodoList from './pages/TodoList';
import DetailPage from './pages/DetailPage'
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import { Ionicons } from '@expo/vector-icons';

TodoList.navigationOptions = {
  title: 'TodoList',
};

DetailPage.navigationOptions = {
  title: "DetailPage",
}

const AppNavigator = createStackNavigator({
  TodoList,
  DetailPage,
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <AppContainer />;
  }
}