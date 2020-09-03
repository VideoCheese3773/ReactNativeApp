import React from "react";
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
    View,
    Image,
} from "react-native";
import { serviceConfig } from '../config/service-config';
import { TouchableOpacity, TextInput, FlatList, TouchableHighlight } from "react-native-gesture-handler";

const bgImage = require('../../assets/backgrounds/bg3.png');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: false,
        arrayPublicaciones: [],
        url: `${serviceConfig.LOCALHOST}publicaciones`
    }

    componentDidMount = () => {
        this.getPublicacion();
    };

    getPublicacion = () => {

        this.setState({
            loading: true
        })

        fetch(this.state.url)

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
        if (this.state.loading) {
            return (
                <ImageBackground source={bgImage} style={styles.background}>
                    <View>
                        <Text style={styles.appText}>
                            Cargando publicaciones
                        </Text>
                    </View>
                </ImageBackground >
            );
        } else {
            return (

                <ImageBackground source={bgImage} style={styles.background}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <Text style={styles.appText}>
                            Publicaciones
                        </Text>
                        <FlatList showsVerticalScrollIndicator={false} data={this.state.arrayPublicaciones} renderItem={({ item }) => (
                            <View style={styles.appButtonText}>
                                <TouchableHighlight style={styles.appButtonContainer}>
                                    <Image source={{
                                        width: 150,
                                        height: 150,
                                        uri: `${item.urlImagen}`
                                    }}
                                    ></Image>

                                </TouchableHighlight>
                                <Text style={styles.appText}>
                                    {item.texto}
                                </Text>
                            </View>
                        )} />
                    </SafeAreaView>
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
        marginHorizontal:15
    },
    appText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
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