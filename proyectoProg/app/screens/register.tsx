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
import { TouchableOpacity, TextInput, ScrollView } from "react-native-gesture-handler";


const bgImage = require('../../assets/backgrounds/bg3.png');

export default class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        nombre_usuario: "",
        correo: "",
        clave: "",
        ciudad: "",
        celular: "",
        nacimiento: "",
        genero: "",
        url: `${serviceConfig.LOCALHOST}usuarios`
    }

    async onLogin() {
        const pn = this.state.primer_nombre
        const sn = this.state.segundo_nombre
        const pa = this.state.primer_apellido
        const sa = this.state.segundo_apellido
        const user = this.state.nombre_usuario;
        const co = this.state.correo
        const pass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, this.state.clave);
        const ci = this.state.ciudad
        const ce = this.state.celular
        const na = this.state.nacimiento
        const ge = this.state.genero

        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                primer_nombre: pn,
                segundo_nombre: sn,
                primer_apellido: pa,
                segundo_apellido: sa,
                nombre_usuario: user,
                correo: co,
                clave: pass,
                ciudad: ci,
                celular: ce,
                nacimiento: na,
                genero: ge
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.error) {
                    Alert.alert("Error", "Datos invalidos en el formulario");
                } else {
                    Alert.alert("Otro Exito", "Usuario creado");
                    this.props.navigation.push("login");
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
                <ScrollView>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <Text style={styles.appText}>
                            Formulario de registro
                    </Text>
                        <TextInput
                            value={this.state.primer_nombre}
                            keyboardType="default"
                            onChangeText={(primer_nombre) => this.setState({ primer_nombre })}
                            placeholder="Primer nombre*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.segundo_nombre}
                            keyboardType="default"
                            onChangeText={(segundo_nombre) => this.setState({ segundo_nombre })}
                            placeholder="Segundo nombre"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.primer_apellido}
                            keyboardType="default"
                            onChangeText={(primer_apellido) => this.setState({ primer_apellido })}
                            placeholder="Primer apellido*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.segundo_apellido}
                            keyboardType="default"
                            onChangeText={(segundo_apellido) => this.setState({ segundo_apellido })}
                            placeholder="Segundo apellido"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.nombre_usuario}
                            keyboardType="default"
                            onChangeText={(nombre_usuario) => this.setState({ nombre_usuario })}
                            placeholder="Nombre usuario*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.correo}
                            keyboardType="default"
                            onChangeText={(correo) => this.setState({ correo })}
                            placeholder="Correo*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.clave}
                            secureTextEntry={true}
                            onChangeText={(clave) => this.setState({ clave })}
                            placeholder="Clave*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.ciudad}
                            keyboardType="default"
                            onChangeText={(ciudad) => this.setState({ ciudad })}
                            placeholder="Ciudad*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.celular}
                            keyboardType="default"
                            onChangeText={(celular) => this.setState({ celular })}
                            placeholder="Celular*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.nacimiento}
                            keyboardType="default"
                            onChangeText={(nacimiento) => this.setState({ nacimiento })}
                            placeholder="Nacimiento*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.genero}
                            keyboardType="default"
                            onChangeText={(genero) => this.setState({ genero })}
                            placeholder="Genero*"
                            placeholderTextColor="grey"
                            style={styles.textInput} />
                        <TouchableOpacity style={styles.appButtonContainer} onPress={this.onLogin.bind(this)}>
                            <Text style={styles.appButtonText}> Registrar </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
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