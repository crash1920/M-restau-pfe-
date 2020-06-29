import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet,Text} from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';
import {Icon,Input,Item} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PasswordInputText from 'react-native-hide-show-password-input';
import {UpdateCustomer} from '../../api/UpdateUser/UpdateUser'
import styles from "./style";

 class UserScreen extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        update:false,
        pass:true,
        icon: "eye-off",
      disabled:true,
      firstname : this.props.user.user.firstname,
      email:this.props.user.user.email,
      lastname: this.props.user.user.lastname,
      password:this.props.user.user.password,
      id:this.props.user.user.id,
      token:this.props.user.user.token,
      sk:this.props.user.user.sk
      }
  }
  enabletextinputs =() =>{
    this.setState(prevState => ({ disabled: prevState.disabled === true ? false :true,
      update:prevState.update === true ? false :true,}));
}
  _changeIcon() {
    this.setState(prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        pass: prevState.pass === true ? false :true
    }));
}
_Enregistrer(fn,ln,pass,email,id,sk) {

UpdateCustomer(fn,ln,pass,email,id,'1',sk) ;
this.setState({ disabled : true,
update:false});
this.props.SAVE_USER(this.state.token,email,fn,ln,pass,id,sk);
}

    render() {
 const dis = this.state.disabled;
     

        const onLogoutPress  = async () => {
           this.props.logout();
            this.props.navigation.navigate("Settings")
          }

      return ( 
        <View style={styles.containerView}>
        
        <ScrollView>
       
       <View>
         <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
       <Text style={styles.label}>Votre email est :                                                                      </Text>
      
       <TouchableOpacity onPress={() => this.enabletextinputs() }>
         
         <Icon  type='Feather' name='edit'><Text style={{fontSize:10}}>{'\n'}Modifier</Text></Icon>
           
          </TouchableOpacity>
       
          </View>
       <TextInput  disabled={dis} style={styles.loginFormTextInput}
       value={this.state.email}    onChangeText={(email) => this.setState({email})}  />
        </View> 
        <View>
       <Text style={styles.label}>Votre Prénom est  :</Text>
       <TextInput  disabled= {dis}  style={styles.loginFormTextInput}
         value={this.state.firstname}  onChangeText={(firstname) => this.setState({firstname})} /> 
         </View>
         <View>
          <Text style={styles.label}>Votre Nom est  :</Text>
              <TextInput  disabled= {dis}  style={styles.loginFormTextInput}
         value={this.state.lastname} onChangeText={(lastname) => this.setState({lastname})} /> 
         </View>
         <View style={{position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'}}>
          <Text style={styles.label}>votre mot de passe est  :</Text>
              
              <TextInput secureTextEntry={this.state.pass} disabled= {dis}  style={styles.loginFormTextInput}
         value={this.state.password} onChangeText={(password) => this.setState({password})}  />
         <View style={{alignItems:'flex-end',bottom:40,right:30}}>        
            <Icon style={{}} name={this.state.icon} onPress={() => this._changeIcon()} />
          
         </View>

         </View>
         <Button  buttonStyle={styles.loginButton}
     disabled={dis}
      title="Enregistrer "
     onPress={()=>this._Enregistrer(this.state.firstname,this.state.lastname,this.state.password,this.state.email,this.state.id,this.state.sk )}
    /> 
          <Button  buttonStyle={styles.loginButton}
      
      onPress={() => onLogoutPress()}
      title="Logout"
     
    /> 
      </ScrollView>
     
      </View>
      
         );
    }
  }
  const mapStateToProps = (state) => {
    return {
        user: state
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () =>{dispatch({ type: 'logout' })} ,
      SAVE_USER: (tok,em,firstname,lastname,password,id,sk) =>{dispatch({ type: 'SAVE_USER', token: tok,email:em, firstname:firstname ,lastname:lastname, password:password,id:id,sk:sk })}
        
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)