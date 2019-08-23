import React from 'react';
import { Container, Text, Content } from 'native-base';
import { SafeAreaView, View, StyleSheet, Dimensions, Platform } from 'react-native'
import Constants from 'expo-constants';
import * as Font from 'expo-font';

export default class DetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', 'NO-ID');
        const itemContent = navigation.getParam('content', 'some default value');
        const itemDueDate = navigation.getParam('date', 'not select');

        return (
            <Container>
                <Content>
                    <SafeAreaView style={{marginTop}}>
                        <View style={[styles.container, styles.row]}>
                            <Text>{ itemContent }</Text>
                            <Text>{ itemDueDate }</Text>
                        </View>
                    </SafeAreaView>
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
    }
});