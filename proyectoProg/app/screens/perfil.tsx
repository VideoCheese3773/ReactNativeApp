import React from "react";
import {
    StyleSheet,
    Text,
    Alert,
    ImageBackground,
    SafeAreaView,
    View,
    Image,
    FlatList,
    TouchableHighlight,
    _ScrollView
} from "react-native";
import { serviceConfig } from '../config/service-config';
import NavBar from "./navbar";
import { ScrollView } from "react-native-gesture-handler";

const bgImage = require('../../assets/backgrounds/bg3.png');
const pfp = require('../../assets/icons/pfp.png');


export default class perfil extends React.Component {
    userId: string;

    constructor(props) {
        super(props)
        this.userId = this.props.route.params.userId;
        this.state = {
            loading: false,
            arrayPublicaciones: [],
            urlPublicaciones: `${serviceConfig.LOCALHOST}usuarios/${this.userId}/publicacions`,
            urlUsuarios: `${serviceConfig.LOCALHOST}usuarios/${this.userId}`,
            nombre: "",
            genero: "",
            nacimiento: "",
            correo: "",
            celular: "",
            ciudad: ""
        }
    }




    componentDidMount = () => {
        this.getUser();
        console.log(`nombre: ${this.state.nombre}`)
        this.getPublicacion();
    };

    getUser = () => {

        this.setState({
            loading: true
        })

        fetch(this.state.urlUsuarios)

            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    nombre: data.primer_nombre + " " + data.segundo_nombre + " " + data.primer_apellido + " " + data.segundo_apellido,
                    genero: data.genero,
                    nacimiento: data.nacimiento,
                    correo: data.correo,
                    celular: data.celular,
                    ciudad: data.ciudad,
                    loading: false
                })
            })
            .catch((err) => {
                Alert.alert("Error", "No se pudo cargar el usuario");
            });


    }

    getPublicacion = () => {

        this.setState({
            loading: true
        })

        fetch(this.state.urlPublicaciones)

            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    arrayPublicaciones: data,
                    loading: false
                })
            })
            .catch((err) => {
                Alert.alert("Error", "No se pudo cargar las publicaciones");
            });


    }
    render() {
        const { navigation } = this.props;
        if (this.state.loading) {
            return (
                <ImageBackground source={bgImage} style={styles.background}>
                    <View>
                        <Text style={styles.appText}>
                            Cargando perfil
                        </Text>
                    </View>
                </ImageBackground >
            );
        } else {
            return (

                <ImageBackground source={bgImage} style={styles.background}>
                    <ScrollView>
                        <SafeAreaView style={styles.safeAreaViewStyle}>
                            <NavBar navigation={navigation}></NavBar>

                            <View>
                                <Image source={pfp} style={styles.viewImagenStyle}></Image>
                            </View>

                            <View>
                                <Text style={styles.appText2}>{this.state.nombre}</Text>
                                <Text style={styles.appText2}>{this.state.genero}</Text>
                                <Text style={styles.appText2}>{this.state.nacimiento}</Text>
                                <Text style={styles.appText2}>{this.state.correo}</Text>
                                <Text style={styles.appText2}>{this.state.ciudad}</Text>
                                <Text style={styles.appText2}>{this.state.celular}</Text>
                            </View>

                            <FlatList showsVerticalScrollIndicator={false} data={this.state.arrayPublicaciones} renderItem={({ item }) => (
                                <View style={styles.appButtonText}>
                                    <TouchableHighlight style={styles.appButtonContainer} onPress={() => { Alert.alert("Descripcion:", item.nombre) }}>
                                        <Image source={{
                                            width: 150,
                                            height: 150,
                                            uri: `${item.imagen}`
                                        }}
                                        ></Image>

                                    </TouchableHighlight>
                                    <Text style={styles.appText}>
                                        {item.texto}
                                    </Text>
                                </View>
                            )} ></FlatList>

                        </SafeAreaView>
                    </ScrollView>
                </ImageBackground >

            )
        }

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
        borderColor: "#009688",
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: "#00665c",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15
    },
    appText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Roboto",
        marginBottom: 15
    },
    appText2: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Roboto",
        marginBottom: 15,
        backgroundColor: "#000"
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
    },
    viewImagenStyle: {
        width: 100,
        height: 100,
        borderRadius: 100,
        overflow: "hidden",
        marginVertical: 15
    }
});