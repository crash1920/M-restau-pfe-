
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, ImageBackground,StyleSheet, Alert,CheckBox} from 'react-native';
import {  Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import { connect ,useSelector} from 'react-redux'
import { TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
import styles from "./style";
import {NewAddress} from '../../api/UserLocation/Location'

class AjoutAdresse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         long : this.props.route.params.long,
         lan : this.props.route.params.lan,
         isSelected:false,
        
          ville:"",
          rue:"",
          codepostale:"",
          alias:"Mon adresse"
          
        };
       
      } 
         async _Adress (lan,long){
          console.log("hedha lan "+lan)
          try {
           await  fetch('http://www.mapquestapi.com/geocoding/v1/reverse?key=YAX029pnHK43J245uvXLw3JVLaB6c0xJ&location='+lan+','+long+'&includeRoadMetadata=true&includeNearestIntersection=true')
            .then((response) => response.json())
             .then((json) => {
               this.setState({  ville : json.results[0].locations[0].adminArea3,
                                rue :    json.results[0].locations[0].street ,
                                codepostale:json.results[0].locations[0].postalCode     });
             })
           } catch (error) {
             console.error(error);  
           }
        
        

        }
      
componentDidMount() {
  
  
   

      }


      ajouter(){
        NewAddress(this.props.user.user.firstname,this.props.user.user.lastname,this.state.rue,this.state.codepostale,this.state.ville,this.props.user.user.id,this.state.alias)
  
      
      }
 Check(){
  this.setState(prevState => ({
   
    isSelected: prevState.isSelected === false ? true :false
}));

 }
render() {


     return (
        <View style = {{backgroundColor:'white',flex:1}} >
     <View style={styles.container}>
        
     <ScrollView>
   
        
    <View>
      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
     <Text style={styles.label}>Alias:   {this.state.alias==""&& <Text style={styles.label}>Ce champ est obligatoire *</Text>  }</Text>
    
       </View>
    <TextInput  style={styles.loginFormTextInput}
    value={this.state.alias} onChangeText={(alias) => this.setState({alias})}    />
 
     </View> 
    <View>
      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
     <Text style={styles.label}>Votre ville est :   {this.state.ville==""&& <Text style={styles.label}>Ce champ est obligatoire *</Text>  }</Text>
    
       </View>
    <TextInput  style={styles.loginFormTextInput}
    value={this.state.ville} onChangeText={(ville) => this.setState({ville})}    />
 
     </View> 
     <View>
    <Text style={styles.label}>Rue  :  {this.state.rue==""&& <Text style={styles.label}>Ce champ est obligatoire *</Text>  }</Text> 
    <TextInput       style={styles.loginFormTextInput}
      value={this.state.rue} onChangeText={(rue) => this.setState({rue})}  /> 
      </View>
      <View>
       <Text style={styles.label}>Code postale :
       {this.state.codepostale==""&& <Text style={styles.label}>ce champ est obligatoire *</Text> }
        
        
        </Text>
           <TextInput keyboardType='numeric' maxLength={5}  style={styles.loginFormTextInput}
      value={this.state.codepostale}  onChangeText={(codepostale) => this.setState({codepostale})}  /> 
      </View>
      <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'flex-start',marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,}} onPress={()=>this._Adress(this.state.lan,this.state.long) }>
      <Icon active  type ='SimpleLineIcons'  name='location-pin' style={{color:'green'}} />
      <Text style={{fontSize:15,color:'green'}}>utiliser ma postion acutelle </Text>
           
      </TouchableOpacity>
   </ScrollView>
   <Button  buttonStyle={styles.acceptButton}
      title=" ajouter " onPress={()=>this.ajouter()}></Button>

   </View>
   </View>
    )
}
}




const mapStateToProps = (state) => {
    return {
        cartItems: state,
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) =>{dispatch({ type: 'REMOVE_FROM_CART', pid: id })} ,
        deleteItem:(id) =>{dispatch({ type: 'DELETE_FROM_CART', pid: id })}
    }
  }


export default  connect(mapStateToProps, mapDispatchToProps)(AjoutAdresse);