import React from 'react';
import { Container, Text, Content, Item, Input, Button, DatePicker } from 'native-base';
import { View, StyleSheet, Dimensions, Platform, Modal } from 'react-native'
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Constants from 'expo-constants';
import {UserConsumer} from "../context/TodoList";

export default class TodoAddView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: "", modalVisible: false, date: Moment().startOf('days'), backColor: '#fff' };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    addProcess(addFunc) {
        if (this.state.title === "") {
            alert("Empty Title")
        } else {
            addFunc({content: this.state.title, date: this.state.date.toString().substr(4, 12)});
            this.setState({title: ""});
        }
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return (
            <View style={[styles.container, styles.col, {padding: 0}]}>
                <View style={[styles.row, styles.container, {paddingTop: 0}]}>
                    <Item inlineLabel>
                        <Input placeholder='Todo Title' value={ this.state.title } onChangeText={ (text) => { this.setState( {title: text} ) } }/>
                    </Item>
                </View>
                <View style={[styles.inputButtonViewStyle, {paddingTop: 5, paddingLeft: 10, paddingRight: 10}]}>
                    <Text onPress={ () => { this.setState({modalVisible: !this.state.modalVisible});}}>{ "CHOOSE DUE DATE" }</Text>
                </View>
                <View style={[styles.inputButtonViewStyle, {paddingTop: 5, paddingLeft: 10, paddingRight: 10}]}>
                    <Text>{ this.state.date.toString().substr(4, 12) }</Text>
                </View>
                <UserConsumer>
                    { ({addListItem}) => (
                        <Button style={styles.listItemButtonStyle} danger onPress={ () => { this.addProcess(addListItem) } } ><Text> ADD ITEM </Text></Button>
                    )}
                </UserConsumer>
                <Modal animationType="slide"
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {
                           Alert.alert('Modal has been closed.');
                       }}>
                    <View style={[{marginLeft: 30, marginTop: 80, marginRight: 30, backgroundColor: '#fff', padding: 10}]}>
                        <Calendar
                            onChange={(date) => this.setState({date})}
                            selected={this.state.date}
                            // We use Moment.js to give the minimum and maximum dates.
                            minDate={Moment().startOf('day')}
                            maxDate={Moment().add(10, 'years').startOf('day')}
                        />
                        <Button style={{width: screenWidth-80, justifyContent: "center",}} warning onPress={ () => { this.setState({modalVisible: !this.state.modalVisible}); } } ><Text> DONE </Text></Button>
                    </View>
                </Modal>
            </View>
        );
    }
}

const marginTop = Platform.OS === 'android' ? Constants.statusBarHeight : 10;
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#fff'
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
        justifyContent: 'center',
        marginBottom: 20,
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
        width: screenWidth-20,
        justifyContent: "center",
        paddingLeft:10,
        paddingRight:10
    },
    listItemViewStyle: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    }
});