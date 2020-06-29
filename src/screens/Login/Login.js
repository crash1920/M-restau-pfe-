import React, { Component } from "react";
import { validationService } from "../../validation/service";
import styles from "./style";
import {Keyboard, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView,Image} from 'react-native';
import { Button } from 'react-native-elements';
import {login} from '../../api/Login/Login';
import { connect } from 'react-redux'
import {Icon,Input,Item} from 'native-base'
import { TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from "react-native-gesture-handler";
 class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pass:true,
        icon: "eye-off",
        pass:true,
      inputs: {
    
        password: {
          type:"password",
          value:"",
          errorLabel:""
        },
        email:{
          type:"email",
          value:"",
          errorLabel:""

        }
      }
    };

    

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    
  }
  
  _changeIcon() {
    this.setState(prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        pass: prevState.pass === true ? false :true
    }));
}

  
  render() {
    
    return (
     
    
        <View style={styles.loginScreenContainer}>
          <ScrollView style={{  backgroundcolor:'white'}}>
          <View style={styles.logo}>
<Image   source={require('../../../Assets/logo.png')} />
</View>
       
            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={value => {
                this.onInputChange({ id: "email", value });
              }} keyboardType="email-address" />
             <Text>{this.renderError("email")}</Text> 
               
            <TextInput placeholder="mot de passe" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={this.state.pass}   onChangeText={value => {
                this.onInputChange({ id: "password", value });
                    
               
              
         
              }}/><Text>{this.renderError("password")}</Text>   
               <View style={{alignItems:'flex-end',bottom:60,right:30}}>        
            <Icon style={{}} name={this.state.icon} onPress={() => this._changeIcon()} />
          
         </View>
              
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress(this.state.inputs.email.value,this.state.inputs.password.value)}
              title="se connecter"
             
            />
                <Text style={{fontSize:17,color:'black',flex:1,flexDirection:'column',alignItems:'center',marginLeft: 120,
  marginRight:30 ,
  marginTop: 5,
  marginBottom: 5,}} >pas encore enregistré ?</Text> 
            <TouchableOpacity style={{flex:1,flexDirection:'column',alignItems:'center',marginLeft: 40,
  marginRight:30 ,
}}
              onPress={() => this.props.navigation.navigate("Register")} title="Sign up">
         
             <Text style={{fontSize:17,color:'green',fontFamily:'bold'}} > créez votre compte  </Text>  
           </TouchableOpacity>
          </ScrollView>
        </View>
  

    );
  }

 

  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel)
       {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
  } else 
    return null;
  
  }
  onLoginPress = async (a,b) => {
    this.getFormValidation();
    if(this.state.inputs['password'].errorLabel == null 
    && this.state.inputs['email'].errorLabel == null )
    {  await login(a,b);
      
      AsyncStorage.getItem('token').then((token) => {
        AsyncStorage.getItem('email').then((email) => { 
          AsyncStorage.getItem('fn').then((fn) => { 
            AsyncStorage.getItem('ln').then((ln) => { 
              AsyncStorage.getItem('id').then((id) => { 
                AsyncStorage.getItem('sk').then((sk) => { 
             console.log(sk)
        if (token !== null) {
         console.log(fn)
         AsyncStorage.setItem('passwd',b);
         this.props.SAVE_USER(token,email,fn,ln,b,id,sk);
         this.props.navigation.navigate('user');
        }
     
   });});});}); });});
    
   
  }
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
  

  