// Libs
import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
// AsyncStorage.getItem('user', (error, result) => {    
//     if (result) {        
//         console.warn("ada")
//     }else{
//         console.warn('tidak ada')
//     }
// });


const Navigator = createStackNavigator({
    Login: { screen: Login },        
    Register: { screen: Register },
    Menu:{ screen: Menu, 
        navigationOptions: {
            header: null,
        },
    },   
});

const beranda = createStackNavigator({    
    Menu:{ screen: Menu, 
                navigationOptions: {
                    header: null,
                },
            },    
    Login: { screen: Login },
    Register: { screen: Register },
});

/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/


const AppContainer = createAppContainer(
    Navigator
);

const BerandaContainer = createAppContainer(
    beranda
);

// export default App;
export default class App extends React.Component {
    constructor(props){ 
    super(props);  
        this.state = { 
            isLoggedIn:false
        }

        AsyncStorage.getItem('user', (error, result) => {
            if (result) {
                // console.warn('asd')
                this.setState({isLoggedIn:true});
            }else{
                // navigate("Login")
            }
        });
    }

    // componentDidMount(){
    //     console.log("componentWillUpdate..");
    //     this.getLocalStorage();
    //   }

    // getLocalStorage = async () => {
    //     try { 
    //         AsyncStorage.getItem('user', (error, result) => {    
    //             if (result) {        
    //                 this.setState({isLoggedIn:true});
    //             }else{
    //                 console.warn('tidak ada')
    //             }
    //         });
    //     } catch(e) {
    //       // error reading value
    //     }
    // }

    render() {
        // console.warn(this.state.isLoggedIn)
        if(this.state.isLoggedIn){
            return (                 
                <BerandaContainer/>                
            );            
        }else{
            return <AppContainer />;    
        }
        
    }
}
