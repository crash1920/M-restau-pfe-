
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, ImageBackground,StyleSheet, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {  Icon, Text } from 'native-base';
import ListItem, { Separator } from '../../screens/Cart/Listitem'
import Recap from './Reacp';
import { Button } from 'react-native-elements';
import { connect ,useSelector} from 'react-redux'
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      loca: {},
      
    };} 
componentDidMount(){

  Geolocation.getCurrentPosition(
    (position) => {
      this.setState({ loca : position.coords});
    },
    (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);  
}

 
render() {
    const transformedCartItems = [];
    for (const key in this.props.cartItems.cart.items) {
      transformedCartItems.push({
        id: key,
        name: this.props.cartItems.cart.items[key].productTitle,
        my_price2: this.props.cartItems.cart.items[key].productPrice,
        quantity: this.props.cartItems.cart.items[key].quantity,
        sum: this.props.cartItems.cart.items[key].sum,
        id_default_image:this.props.cartItems.cart.items[key].id_default_image,
        description : this.props.cartItems.cart.items[key].desc
      });
    }

     return (
         
     <View style={styles.container}>
  <FlatList
          data={transformedCartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>  {return  (
            <Recap
            
              product={item}
              onRightPress={this.props.deleteItem}
            />
          )} }
          ItemSeparatorComponent={() => <Separator />}
          />  
            <Text> note : swipe a gauche pour supprimer un article</Text>
    {transformedCartItems.length !== 0 ?   
    
 <Button  buttonStyle={styles.suivButton}
      title="suivant "  onPress={()=> this.props.navigation.navigate('Livraison',{lan:this.state.loca.latitude,long : this.state.loca.longitude})}></Button>
      : <Text>il faut avoir au moins un produit pour pouvoir continuer</Text>}
     
 <View style={styles.summary}>
      
          <Text style={{color:'black',fontSize:20}}>Le total est de : <Text  style={{color:'red',fontSize:20}}>{this.props.cartItems.cart.totalAmount} TND</Text></Text>  
      
       
      </View>
     </View>
    )
}
}


const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summary: {
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
  suivButton: {
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


export default  connect(mapStateToProps, mapDispatchToProps)(Orders);