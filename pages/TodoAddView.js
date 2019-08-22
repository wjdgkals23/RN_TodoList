import React from 'react';
import { Container, Text, Content, Item, Input, Button, DatePicker } from 'native-base';
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants';
import { UserConsumer } from "../context/TodoList";

export default class TodoAddView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return (
            <Container>
                <Content>
                    <UserConsumer>
                        {}
                        <View style={[styles.container, styles.col, {padding: 0}]}>
                            <View style={[styles.row, styles.container]}>
                                <Item inlineLabel>
                                    <Input placeholder='Todo Title' value={ this.state.title } onChangeText={ (text) => { this.setState( {title: text} ) } }/>
                                </Item>
                            </View>
                            <View style={[styles.row, styles.container]}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    maximumDate={new Date(Number(new Date().getFullYear()) + 2, 12, 31)}
                                    locale={"kr"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Due date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </View>
                            <Button style={{width: screenWidth-20, justifyContent: "center", paddingLeft:10, paddingRight:10}} danger ><Text> ADD ITEM </Text></Button>
                        </View>
                    </UserConsumer>
                </Content>
            </Container>
        );
    }
}

const marginTop = Platform.OS === 'android' ? Constants.statusBarHeight : 10;
const screenWidth = Math.round(Dimensions.get('window').width);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    },
    inputButtonViewStyle: {
        flex: 1,
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