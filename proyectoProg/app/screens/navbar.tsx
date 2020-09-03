import React from "react";
import {
    StyleSheet,
    Text,
    AsyncStorage,
    View,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";

const logoutIcon = require("../../assets/icons/logout.png")
const homeIcon = require("../../assets/icons/home.png")
const pencilIcon = require("../../assets/icons/pencil.png")
const userIcon = require("../../assets/icons/user.png")

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        isLogged: false
    }

    async componentDidMount() {
        let session = await AsyncStorage.getItem("session");
        if (session) {
            this.setState({
                isLogged: true
            })
        }
    };

    logout = () => {
        Alert.alert("Cerrar sesión", "Estas seguro de que quieres cerrar sesión?", [
            {
                text: "Si",
                onPress: () => {
                    AsyncStorage.removeItem("session")
                    this.setState({
                        isLogged: false
                    });
                    this.props.navigation.push('Inicio')
                }
            }, {
                text: "No"
            }
        ]);
    };

    render() {

        if (this.state.isLogged) {
            return (
                <View style={styles.viewStyle2}>
                    <View style={styles.viewStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("publicaciones")}>
                            <Image source={homeIcon} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.appText}>
                            Inicio
                        </Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <TouchableOpacity onPress={this.logout}>
                            <Image source={pencilIcon} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.appText}>
                            Publicar
                    </Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("login")}>
                            <Image source={userIcon} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.appText}>
                            Perfil
                        </Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <TouchableOpacity onPress={this.logout}>
                            <Image source={logoutIcon} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.appText}>
                            Salir
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View>

                    <Text style={styles.appText}>
                        Iniciar Sesión
                        </Text>
                </View>


            );

        }

    }
}
const styles = StyleSheet.create({

    appText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Roboto",
        marginBottom: 7,
        alignItems: "stretch"
    },
    viewStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    viewStyle2: {
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-around",
        top: 0,
        width: "100%",
        paddingTop: 10
    },
    imageStyle: {
        width: 30,
        height: 30,
    }
});