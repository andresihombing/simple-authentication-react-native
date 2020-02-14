import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    StatusBar,TouchableOpacity,
    TextInput, SafeAreaView,AsyncStorage
} from 'react-native'

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;

        this.state = {
            username: "",
            Password: "",
            token: ""
        }

        AsyncStorage.getItem('user', (error, result) => {  
            console.warn(result)          
            if (result) {
                navigate("Menu")                
                // let resultParsed = JSON.parse(result)
                // this.setState({
                //     token: resultParsed.token,
                // });
            }
            // else{
                // navigate("Login")
            // }
        });
    }    

    submitReg(){
        const { navigate } = this.props.navigation;
        let formdata = new FormData();
        formdata.append('username', this.state.username);
        formdata.append('password', this.state.password);
        
        fetch('http://10.42.0.84:8000/user/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token 97a74c03004e7d6b0658dfdfde34fd6aa4b14ddb'
            },
            body: formdata,
        })        
        .then((response) => response.json())
        .then((data) => {    
            console.log(data);
            let token = data.data.token;        
            let dataToken = {
                token: token,
            }            
            AsyncStorage.setItem('user', JSON.stringify(dataToken));                        
            navigate("Menu")
                        
        })
        .catch((error) => {
            alert('Username or Password is wrong')
            console.log('Error:', error);
        });        
    }

    render() {        
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style = {styles.container}>
                <StatusBar barStyle = "light-content"/>                
                <View style = {styles.logoContainer}>                        
                    {/* <Image style = {styles.logo}
                        source = {require('../images/logo.jpeg')}>
                    </Image> */}
                    <View style = {styles.infoContainer}>
                        <Text style = {styles.title}>Login</Text>
                        <TextInput style = {styles.input}
                            placeholder = "Username"
                            placeholderTextColor = "rgba(255,255,255,0.8)"
                            returnKeyType = 'next'
                            autoCorrect = {false}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <TextInput style = {styles.input}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.8)"                            
                            secureTextEntry
                            autoCorrect = {false}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress = {() => this.submitReg()}>
                            <Text style = {styles.buttonText}>SIGN IN</Text>
                        </TouchableOpacity>                                                                                
                        <Text style={styles.buttonReg}>
                            Anda belum mempunyai akun?
                            <Text>  </Text>                        
                            <Text style={{color: '#f7c744'}} onPress={() => navigate(
                                'Register'
                            )}>
                            Register
                            </Text>
                        </Text>        
                    </View>
                </View>                             
            </SafeAreaView>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {        
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    // logo: {
    //     width: 128,
    //     height: 56
    // },
    title: {
        color: '#f7c744',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 25,
        opacity: 0.9
    },
 
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        paddingHorizontal: 10,
        marginTop: 20,        
    },

    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 380,        
        padding: 20
        // backgroundColor: 'red'
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 15,        
    },
    buttonReg: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,        
        marginTop: 20,        
    },

})