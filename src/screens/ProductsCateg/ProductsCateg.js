import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet} from 'react-native';
import Register from '../Register/Register';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {product} from '../../api/Product/Product';
import Products from './Products';
import {ProductByCateg} from '../../api/Product/Product'
export default class ProductsCateg extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
     

  prod : []
  }
  id=this.props.route.params.idcat
 
}

_loadProducts() {

   
  ProductByCateg(id).then(data => {
    this.setState({ prod: data.products }) ;
    AsyncStorage.setItem('prod', JSON.stringify(this.state.prod));
})

AsyncStorage.getItem('prod').then((prod) => { 
         
        
  this.setState({ prod: JSON.parse(prod) }) 
 

}); 
}
componentDidMount() {
 this._loadProducts()
}


  render() {
   
  
    
    return (
      <View>
        
         <FlatList
         vertical
          showsVerticalScrollIndicator={true}
          numColumns={2}
  data={this.state.prod}
  keyExtractor ={(item) => item.id.toString()}
  renderItem={({item}) => <Products product={item} navigation = {this.props.navigation} />}
/>  
    </View>
       );
  }
}
