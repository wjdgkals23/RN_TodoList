import React from 'react';
import { Container, Text, Content, Item, Input, Button, List, ListItem } from 'native-base';
import { SafeAreaView, View, StyleSheet, Dimensions, ScrollView, FlatList, Platform } from 'react-native'
import Constants from 'expo-constants';
import TodoAddView from './TodoAddView'
import TodoListView from './TodoListView'
import { UserProvider } from "../context/TodoList";
import _ from "underscore"

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list : [],
            title: "",
            showAddView: true,
            showAddText: "Add View CLOSE"
        };
    }

    addListItem = (text) => {
        console.log(text);
        let newItem = { id: Date.now().toString(), content: text };
        this.setState({list: [...this.state.list, newItem]});
    };

    upOrderListItem = () => {

    };

    removeListItem = (item) => {
        this.setState({list: _.reject(this.state.list, (listItem)=>{ listItem.id === item.id; })})
    };

    render() {
        return (
            <Container>
                <Content>
                    <SafeAreaView style={{marginTop}}>
                        <View style={[styles.container, styles.row]}>
                            <View style={[styles.inputButtonViewStyle, {paddingTop: 5, paddingLeft: 10, paddingRight: 10}]}>
                                <Text onPress={ () => { this.setState({showAddView: !this.state.showAddView}); this.setState({showAddText: this.state.showAddView? "Add View OPEN":"Add View CLOSE"}) }}>{ this.state.showAddText }</Text>
                            </View>
                        </View>
                        <UserProvider>
                            <View style={[styles.container, styles.row]}>
                                { this.state.showAddView && <TodoAddView/> }
                            </View>
                            <View style={[styles.container, styles.row]}>
                                <TodoListView navi={this.props.navigation}/>
                            </View>
                        </UserProvider>
                    </SafeAreaView>
                </Content>
            </Container>
        );
    }
}

const marginTop = Platform.OS === 'android' ? Constants.statusBarHeight : 0;
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    inputStyle: {
        width: screenWidth/4*3,
        padding: 3
    },
    ButtonCommonStyle: {
        justifyContent: "center",
        alignItems: "center"
    },
    inputButtonViewStyle: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        marginRight: 5,
    },
    listViewStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
    },
    listItemButtonViewStyle: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    listItemButtonStyle:{
        margin: 3,
    },
    listItemViewStyle: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    }
});