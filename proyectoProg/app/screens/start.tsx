import React from 'react';
import { TouchableOpacity, Text, ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

const bgImage = require('../../assets/backgrounds/bg3.png');

export default class Inicio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.background}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                    <Text style = {styles.appText}>
                        BetWhere
                    </Text>
                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.props.navigation.push('login')}>
                        <Text style={styles.appButtonText}> LogIn </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.props.navigation.push('register')}>
                        <Text style={styles.appButtonText}> Register </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 7,
        marginBottom: 7,
        width: 200,
        alignSelf: "center"
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Roboto",
        marginBottom: 15
    },
    safeAreaViewStyle: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
});