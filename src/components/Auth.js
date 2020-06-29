
  import React from 'react';
  import 'react-native-gesture-handler';
  import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput,
  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import SettingsScreen from '../screens/Settings/SettingsScreen';
  import Login from '../screens/Login/Login';
  import AsyncStorage from '@react-native-community/async-storage';
  import Register from '../screens/Register/Register';
 import LocationScreen from '../screens/Location/LocationScreen'
  import UserScreen from '../screens/User/UserScreen';
 import AjoutAdresse from '../screens/Location/AjoutAdresse';
 import ModifierAdresse from '../screens/Location/ModifierAdresse'
  const Stack =createStackNavigator();
  
  class Auth extends React.Component {
    componentDidMount()
    {const ro = async() => {
      await AsyncStorage.getItem('token').then((token) => {
      AsyncStorage.getItem('email').then((email) => { 
        AsyncStorage.getItem('fn').then((fn) => { 
          AsyncStorage.getItem('ln').then((ln) => { 
            AsyncStorage.getItem('passwd').then((passwd) => { 
              AsyncStorage.getItem('id').then((id) => { 
                AsyncStorage.getItem('sk').then((sk) => { 
        if (token !== null) {
         
          this.props.SAVE_USER(token,email,fn,ln,passwd,id,sk);
        
         }
      
     
        });});}); });   });});});
    }
    

      ro();
    }
    render() {
    
     console.log(this.props.user.user)
    return (
        <Stack.Navigator>
   
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerTitle:"parametres du compte ",
           }} />
       
           { 
              this.props.user.user.token == null ? (
                <>
                
            <Stack.Screen name="Login" component={Login} options={{headerTitle:"connectez-vous ",
           }} />
            <Stack.Screen name="Register" component={Register}  options={{headerTitle:"créez votre compte ",
           }} />
                </>
          ) : (<>
            <Stack.Screen name="user" component={UserScreen} options={{headerTitle:"utilisateur ",
           }} />
            <Stack.Screen name="location" component={LocationScreen} options={{headerTitle:"Adresses de livraison ",
           }}/>
            <Stack.Screen name="AjoutAdresse" component={AjoutAdresse} options={{headerTitle:"Ajouter une adresse de livraison ",
           }}/>
           <Stack.Screen name="ModifierAdresse" component={ModifierAdresse} options={{headerTitle:"Modifier cette adresse de livraison ",
           }}/>
            </>
           ) } 
          
        </Stack.Navigator>
    );
  }}
  const mapStateToProps = (state) => {
    return {
        user: state
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    SAVE_USER: (tok,em,firstname,lastname,password,id,sk) =>{dispatch({ type: 'SAVE_USER', token: tok,email:em, firstname:firstname ,lastname:lastname, password:password,id:id,sk:sk})}
      
  }
}

          
          export default connect(mapStateToProps,mapDispatchToProps)(Auth);