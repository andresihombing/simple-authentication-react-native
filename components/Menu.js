import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Button } from 'react-native-paper';
import Home from './Home'

class Menu extends React.Component {  

  static navigationOptions = {
    header: null
  };
  
  async logout(){
    const {dispatch, navigate } = this.props.navigation;
    try {
      await AsyncStorage.getItem('user', (error, result) => {       
        let tokenString = JSON.parse(result);
        
        //   console.warn
        // }
        fetch('http://10.42.0.84:8000/user/logout',
        {
            method: 'POST', 
            headers:{
                //this what's exactly look in my postman
                'Authorization': tokenString.token
            },            
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.detail)            
        }).catch((error) => {
            alert('error')
        })
        
        AsyncStorage.removeItem('user', (error, result) => {
          navigate("Login")
          alert("Logout Success!")
        });
        // navigate("Login")
        // alert("Logout Success!")
      });            
      dispatch(reset);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <Button onPress={() => this.logout()}>
          <Text >Logout</Text>
        </Button>
      </View>
    )
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
        <Button>
          <Text>Logout</Text>
        </Button>
      </View>
    )
  }
}

class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HistoryScreen</Text>
      </View>
    )
  }
}

class CartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CartScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Menu,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />            
          </View>          
        ),
      }
    },
  
    Information: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-information-circle-outline'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#2c6d6a' },
      }
    },
    Profile: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#6948f4' },
  }
);

export default createAppContainer(TabNavigator);