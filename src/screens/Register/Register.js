import React, { Component} from 'react';

import ValidationComponent from 'react-native-form-validator';
import { StyleSheet, View,  Text, ActivityIndicator, TouchableOpacity,ScrollView,} from 'react-native';
import { validationService } from "../../validation/service";
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import HomeScreen from '../Home/HomeScreen';
import { TextInput } from 'react-native-paper'
import {PostingCustomer} from '../../api/Register/PostCustomer';


 class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date:'',

      inputs: {
      
        

        first_name: {
          type: "generic",
          value: "",
          errorLabel:""
        },
        last_name: {
          type: "generic",
          value: "",
          errorLabel:""
        },
       
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
  
  

  
  

    submit = () => {
  const { inputs } = this.state ; 
  
     this.getFormValidation();
    if(inputs['first_name'].errorLabel == null 
    && inputs['last_name'].errorLabel == null 
     && inputs['password'].errorLabel == null 
    && inputs['email'].errorLabel == null 
   ) 
   {
    const firstname =  this.state.inputs.first_name.value ;

    const    lastname= this.state.inputs.last_name.value; 

     const passwd = this.state.inputs.password.value ; 

     const email = this.state.inputs.email.value;
     const date = this.state.date 
    
      PostingCustomer(firstname,lastname,passwd,email,date);
alert("succés");
}    
else console.log(this.state.date);
    
  }


  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel)
       {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
  } else 
    return null;
  
  }
 
  render() {

    console.disableYellowBox = true;
    

    return (
     
      <View style={styles.container}>
         
        <ScrollView>
          <View>
            
            <TextInput
            placeholder="Nom *" placeholderColor="#c4c3cb"
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "first_name", value });
              }}
            />
            {this.renderError("first_name")}
          </View>

          <View>
            
            <TextInput
            placeholder="Prénom *" placeholderColor="#c4c3cb"
              style={styles.input}
              
              onChangeText={value => {
                this.onInputChange({ id: "last_name", value });
              }
            
            }
            />
            {this.renderError("last_name")}
          </View>
          <View>
           
            <TextInput
            placeholder="Email *" placeholderColor="#c4c3cb"
             keyboardType =  'email-address'
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "email", value });
              }}
            />
            {this.renderError("email")}
          </View>
          <View>
           
            <TextInput
            placeholder="Mot de passe *" placeholderColor="#c4c3cb"
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "password", value });
              }}
              secureTextEntry
            />
            {this.renderError("password")}
          </View>

            <View>
           
            <View>
            <DatePicker
            
          style={{width: 360 ,borderWidth: 1,
            borderColor: "black", 
            marginBottom: 15,alignSelf: "center", borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#fafafa',marginTop: 20,
            marginBottom: 10,
             }}
         
          mode="date"
          date={this.state.date}
          placeholder="date de naissance(optionel)  YYYY-MM-DD"
          format="YYYY-MM-DD"
          
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date});}}
       
         
            />
           
              </View>
               </View>
               <View style={styles.Button}>
          <Button  clearButtonMode="always" buttonStyle={{backgroundColor: 'black',
  borderRadius: 500,
  height: 45,}} title="inscription " onPress={this.submit} />
          
        </View>
        </ScrollView>

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    backgroundColor:"white"
  },
  input: {
    height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor: '#fafafa',
  paddingLeft: 20,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 20,
  marginBottom: 10,
  },
  split: {
    flexDirection: "row"
  },
  error: {
    position: "absolute",
    bottom: 0,
    top:5,
    color: "red",
    fontSize: 12,
    left:13
  },
  Button: {
   backgroundColor: 'black',
  borderRadius: 500,
  height: 45,
   width:190,
  marginTop: 10 ,
  marginLeft:110,
  marginRight:15,
  

  }
});
export default Register;