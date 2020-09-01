import { StatusBar } from "expo-status-bar"
import React from "react";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    AsyncStorage,
    ImageBackground,
} from "react-native";

import md5 from "md5"

const bgImg = require("../../assets/backgrounds/bg1.jpg")

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {,
        username: "",
        password: "",
        url: "http://192.168.1.66:3000/login",
    }

    async onLogin() {
        const user = this.state.username;
        const pass = md5(this.state.password);

        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user,
                password: pass,
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                AsyncStorage.setItem("session", JSON.stringify(data));
                this.props.navigation.push("Home");
            })
            .catch((err) => {
                Alert.alert("App Message", "Invalid data.");
            });

    }

    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground source={bgImg} style={StyleSheet.background} />
            <Button
                title="Ir al inicio"
                onPress={() => navigation.navigate("Home")}
            />
            <Text style={StyleSheet.titleText}>

            </>

        )
        

    }
}
