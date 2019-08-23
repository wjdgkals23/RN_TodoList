import React from 'react';
import {Container, Text, Content, ListItem, Button} from 'native-base';
import {StyleSheet, Dimensions, FlatList, ScrollView, View} from 'react-native'
import { UserConsumer } from "../context/TodoList";

export default class TodoListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navi: this.props.navi
        }
    }

    _renderItem = ({item}) => (
        <ListItem>
            <View style={[styles.row, styles.listViewStyle]}>
                <View style={[styles.column,styles.listItemViewStyle]}>
                    <Text style={{textDecorationLine: item.done? 'line-through':'none'}}>{ item.content }</Text>
                    <Text>{ "Due Date : " + item.date }</Text>
                </View>
                    <UserConsumer>
                        {({removeTodoListItem, changeTodoItemDone}) => (
                            <View style={[styles.row, styles.listItemButtonViewStyle]}>
                                <Text style={[styles.listItemButtonStyle, {color:"#0f0"}]} onPress={() => this.state.navi.navigate('DetailPage', item)}>자세히</Text>
                                <Text style={[styles.listItemButtonStyle, {color:"#00f"}]} onPress={() => changeTodoItemDone(item)}>완료</Text>
                                <Text style={[styles.listItemButtonStyle, {color:"#f00"}]} onPress={() => removeTodoListItem(item)}>삭제</Text>
                            </View>
                        )}
                    </UserConsumer>
            </View>
        </ListItem>
    );

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <UserConsumer>
                {({todoList}) =>
                    <ScrollView>
                        <FlatList data={todoList} keyExtractor={this._keyExtractor}
                                  renderItem={this._renderItem}/>
                    </ScrollView>
                }
            </UserConsumer>
        );
    }
}

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
        fontSize: screenWidth/20,
    },
    listItemViewStyle: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    }
});