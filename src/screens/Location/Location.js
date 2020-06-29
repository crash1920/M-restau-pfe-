
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, ImageBackground,StyleSheet, Alert} from 'react-native';
import {  Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import { connect ,useSelector} from 'react-redux'
import { TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';

export const Separator = () => <View style={styles.separator} />;

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: '' ,
        };}
render() {


    const { checked } = this.state;
   const adresse = this.props.adresse

   console.log(adresse)
     return (
    
        <ScrollView  style={{backgroundColor:'white'}}>
          
          <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 20,}}>
            
         
           
            <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         <Text style={{fontFamily:'Arial',fontSize:15,color:'grey'}}>Votre Adresse:</Text>
         <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
        <Text style={{fontFamily:'Arial',fontSize:14,color:'black'}}> {adresse.address1} , {adresse.city} , {adresse.postcode} </Text>
      
        </View>
        </View> 
         <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
      
        </View>  
        
        <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
     
        <RadioButton
          value= {adresse.id}
          status={checked === adresse.id ? 'checked' : 'unchecked'}
          onPress={() =>  this.setState({ checked: adresse.id} )} 
/> 
 
{console.log("zokommeeeekk"+checked)}
</View>
<Icon  type='Feather' name='delete'><Text style={{fontSize:8}}>{'\n'}Supprimer</Text></Icon>
<Icon  type='Feather' name='edit'><Text style={{fontSize:8}}>{'\n'}Modifier</Text></Icon>
{console.log(checked)}
       </View>
       </ScrollView>
     
    
    )
}
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    text: {
      color: '#4a4a4a',
      fontSize: 15,
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#e4e4e4',
      marginLeft: 10,
    },
    number:{
    
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
color: '#444444',
marginTop:10,
marginRight: 5,
marginLeft: 5,
    }, rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        // flex: 1,
        alignItems: 'flex-end',
      },
      actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
      },summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
      },
      summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
      },
      amount: {
        color: 'red'
      },
      acceptButton: {
        backgroundColor: 'black',
        borderRadius: 500,
        height: 45,
        marginTop: 10 ,
     
        marginLeft:15,
        marginRight:15,
        
      },
  });

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


export default  connect(mapStateToProps, mapDispatchToProps)(Location);  