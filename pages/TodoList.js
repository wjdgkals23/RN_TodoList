import React from 'react';
import { Container, Text, Content, Item, Input, Button, List, ListItem } from 'native-base';
import { SafeAreaView, View, StyleSheet, Dimensions, ScrollView, FlatList, Platform } from 'react-native'
import Constants from 'expo-constants';


export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list : [],
            title: "",
        };
    }

    addList = (text) => {
        console.log(text);
        let newItem = { id: Date.now().toString(), content: text };
        this.setState({list: [...this.state.list, newItem]});
    };

    _renderItem = ({item}) => (
        <ListItem>
            <View style={[styles.row, styles.listViewStyle]}>
                <View style={[styles.row,styles.listItemViewStyle]}>
                    <Text>{ item.content }</Text>
                </View>
                <View style={[styles.row, styles.listItemButtonViewStyle]}>
                    <Text style={[styles.listItemButtonStyle, {color:"#0f0"}]} onPress={() => this.props.navigation.navigate('DetailPage', item)}>위로</Text>
                    <Text style={[styles.listItemButtonStyle, {color:"#00f"}]} onPress={() => this.props.navigation.navigate('CalendarPage', item)}>아래로</Text>
                    <Text style={[styles.listItemButtonStyle, {color:"#f00"}]}>삭제</Text>
                </View>
            </View>
        </ListItem>
    );

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <Container>
                <Content>
                    <SafeAreaView style={{marginTop}}>
                        <View style={[styles.container, styles.row]}>
                            <View style={[styles.inputStyle]}>
                                <Item rounded>
                                    <Input placeholder='Rounded Textbox' value={ this.state.title } onChangeText={ (text) => { this.setState( {title: text} ) } }/>
                                </Item>
                            </View>
                            <View style={[styles.inputButtonViewStyle]}>
                                <Button warning onPress={ () => { this.addList(this.state.title) } }><Text> add </Text></Button>
                            </View>
                        </View>
                        <ScrollView>
                            <FlatList data={ this.state.list } keyExtractor={ this._keyExtractor } renderItem={ this._renderItem } />
                        </ScrollView>
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
        width: screenWidth/4,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
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