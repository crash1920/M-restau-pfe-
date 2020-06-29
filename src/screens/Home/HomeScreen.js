import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet} from 'react-native';
import Register from '../Register/Register';
import { connect } from 'react-redux'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {product} from '../../api/Product/Product';
import ProductsItems from './ProductsItems';
import ProductsItemsWr from './ProductsItemsWr';
import AsyncStorage from '@react-native-community/async-storage';
 class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
  products : []
  }
}

_loadProducts() {
 product().then(data => {
    this.setState({ products: data.products })
    AsyncStorage.setItem('products', JSON.stringify(this.state.products));})
    AsyncStorage.getItem('products').then((prod) => { 
             
            
      this.setState({ products: JSON.parse(prod) }) 
     
  
}); 

}
componentDidMount() { 
  const ro = async() => {
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
    
   
      });});});  });});});});
  }
  

    ro();
  
  this._loadProducts()
  
}


  render() {
    
  

    return (

      <FlatList
      ListHeaderComponent={
      <>
       <FlatList
         horizontal
         showsHorizontalScrollIndicator={false}
           data={this.state.products}
           keyExtractor ={(item) => item.id.toString()}
           renderItem={({item}) => {if (item.my_price2<item.my_price) return( <ProductsItems product={item}/>) }}
/>
      </>}
     
      ListFooterComponent={
        <FlatList
      vertical
       data={this.state.products}
       keyExtractor ={(item) => item.id.toString()}
      renderItem={({item}) => {if(item.id>19)return(<ProductsItemsWr  navigation = {this.props.navigation} all={item}/>);}
      }
    />
      }/>
   
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
  SAVE_USER: (tok,em,firstname,lastname,password,id,sk) =>{dispatch({ type: 'SAVE_USER', token: tok,email:em, firstname:firstname ,lastname:lastname, password:password,id:id,sk:sk })}
    
}
}

        
        export default connect(mapStateToProps,mapDispatchToProps)( HomeScreen);