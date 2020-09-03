import React from "react";
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
} from "react-native";
import * as Crypto from 'expo-crypto';
import { serviceConfig } from '../config/service-config';
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

const bgImage = require('../../assets/backgrounds/bg3.png');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        username: "",
        password: "",
        url: `${serviceConfig.LOCALHOST}login-usuario`
    }
    async onLogin() {
        const user = this.state.username;
        const pass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, this.state.password);

        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre_usuario: user,
                clave: pass,
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.error) {
                    Alert.alert("Error", "Usuario o contraseña incorrecta");
                } else {
                    console.log(data)
                    this.state.username = "";
                    this.state.password = "";
                    AsyncStorage.setItem("session", JSON.stringify(data));
                    this.props.navigation.navigate("publicaciones");
                }
            })
            .catch((err) => {
                Alert.alert("App Message", "Invalid data.");
            });
    }
    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground source={bgImage} style={styles.background}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                    <Text style={styles.appText}>
                        LogIn
                    </Text>
                    <TextInput
                        value={this.state.username}
                        keyboardType="default"
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="Nombre usuario"
                        placeholderTextColor="grey"
                        style={styles.textInput} />
                    <TextInput
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="Clave"
                        placeholderTextColor="grey"
                        style={styles.textInput} />
                    <TouchableOpacity style={styles.appButtonContainer} onPress={this.onLogin.bind(this)}>
                        <Text style={styles.appButtonText}> LogIn </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground >
        )
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textInput: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 7,
        marginBottom: 7,
        width: 200,
        alignSelf: "center"
    }
});