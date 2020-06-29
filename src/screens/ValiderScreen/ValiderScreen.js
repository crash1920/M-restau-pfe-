
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, ImageBackground,StyleSheet, Alert} from 'react-native';
import {  Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import { connect ,useSelector} from 'react-redux'
import { TextInput } from 'react-native-paper';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {PostOrder,PostCart} from '../../api/Order/order'
import AsyncStorage from '@react-native-community/async-storage';

class ValiderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         adresse : this.props.route.params.adresse,
         id_add:this.props.route.params.id_add,
         id_cart:'',
        };} 
         _valider = async (cart_rows)=>{

           await AsyncStorage.getItem('cart_id').then(async (cart_id) => {
          await   PostOrder (this.state.id_add,this.props.user.user.id,this.props.user.user.sk,this.props.cartItems.cart.totalAmount,
              cart_rows,cart_id)
              alert("votre commande vient d'étre confirmé");
      
           })
           
}
render() {
  const transformedCartItems = [];
    for (const key in this.props.cartItems.cart.items) {
      transformedCartItems.push({
        id_product: key,
        id_product_attribute:0,
        id_customization:0,
        id_address_delivery:this.state.id_add,
         quantity: this.props.cartItems.cart.items[key].quantity,
       
      });
    }
   
console.log(this.props.cartItems.cart.totalAmount-(this.props.cartItems.cart.totalAmount*0.19))

     return (
    
        <ScrollView  style={{backgroundColor:'white'}}>
        <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 10,}}>
            
          
         <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         <Text style={{fontFamily:'Arial',fontSize:15,color:'grey'}}>Adresse de livraison :</Text>
        <Text style={{fontFamily:'Arial',fontSize:17,color:'black'}}>{this.state.adresse} </Text>
      
        </View>  
     
        <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
      
</View>

     
       </View>
       <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 20,}}>
            
          
         <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         <Text style={{fontFamily:'Arial',fontSize:15,color:'grey'}}>Méthode de paiement  :</Text>
        <Text style={{fontFamily:'Arial',fontSize:17,color:'black'}}>En espèces lors de la livraison </Text>
      
        </View>  
     
        <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
      
</View>

     
       </View>
       <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 20,}}>
            
          
         <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         <Text style={{fontFamily:'Arial',fontSize:15,color:'grey'}}>Votre commande  :</Text>
         <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
        <Text style={{fontFamily:'Arial',fontSize:17,color:'black'}}>Montant total </Text>
        <Text style={{fontFamily:'Arial',fontSize:19,color:'black',marginLeft:200}}>{this.props.cartItems.cart.totalAmount} TDN</Text>
        </View>
        </View>  
     
       

     
       </View>
       <View style={{   flex: 1,
          flexDirection: "column",
        justifyContent: 'flex-end'}} >
       <Button  buttonStyle={styles.acceptButton}
 title="Accepter" onPress= {()=>this._valider(transformedCartItems)}
/> 
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


export default  connect(mapStateToProps, mapDispatchToProps)(ValiderScreen);  