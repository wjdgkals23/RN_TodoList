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

        return (
            <Container>
                <Content>
                    <SafeAreaView style={[{marginTop}, styles.col, styles.topContainer]}>
                        <View style={[styles.container, styles.row]}>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View style={[styles.container, styles.row]}>
                            <View style={styles.view1}></View>
                        </View>
                        <View style={[styles.container, styles.row]}>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                    </SafeAreaView>
                </Content>
            </Container>
        );
    }
}

const marginTop = Platform.OS === 'android' ? Constants.statusBarHeight : 0;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    topContainer: {
        alignContent: "space-between",
        height: screenHeight,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    },
    view1: {
        flex: 1,
        height: screenHeight/5,
        backgroundColor: "#ff0",
    },
    view2: {
        flex: 1,
        height: screenHeight/5,
        backgroundColor: "#f0f",
    },
    view3: {
        flex: 1,
        height: screenHeight/5,
        backgroundColor: "#0ff",
    },
});