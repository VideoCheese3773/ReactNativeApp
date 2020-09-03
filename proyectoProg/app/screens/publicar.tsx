import React from "react";
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
} from "react-native";
import { serviceConfig } from '../config/service-config';
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

const bgImage = require('../../assets/backgrounds/bg3.png');

export default class Publicar extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        title: "",
        description: "",
        link: "",
        url: `${serviceConfig.LOCALHOST}publicaciones`
    }
    async publicar() {
        const title = this.state.title;
        const description = this.state.description;
        const link = this.state.link;
        const date = new Date().toISOString().substr(0, 19);
        const userId = this.props.route.params.userId;

        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                texto: title,
                nombre: description,
                fecha: date,
                imagen: link,
                usuarioId: userId
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.error) {
                    Alert.alert("Error", "Datos invalidos");
                } else {
                    Alert.alert("Exito", "publicacion creada correctamente")
                    this.props.navigation.push("publicaciones");
                }
            })
            .catch((err) => {
                Alert.alert("App Message", "Invalid data.");
            });
    }
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.background}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                    <Text style={styles.appText}>
                        Crear Publicación
                    </Text>
                    <TextInput
                        value={this.state.title}
                        keyboardType="default"
                        onChangeText={(title) => this.setState({ title })}
                        placeholder="Titulo"
                        placeholderTextColor="grey"
                        style={styles.textInput} />
                    <TextInput
                        value={this.state.description}
                        keyboardType="default"
                        onChangeText={(description) => this.setState({ description })}
                        placeholder="Descripción"
                        placeholderTextColor="grey"
                        style={styles.textInput} />
                    <TextInput
                        value={this.state.link}
                        keyboardType="default"
                        onChangeText={(link) => this.setState({ link })}
                        placeholder="URL Imagen"
                        placeholderTextColor="grey"
                        style={styles.textInput} />
                    <TouchableOpacity style={styles.appButtonContainer} onPress={this.publicar.bind(this)}>
                        <Text style={styles.appButtonText}> Publicar </Text>
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