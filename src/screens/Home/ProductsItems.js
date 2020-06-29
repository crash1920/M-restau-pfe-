
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet, ImageBackground} from 'react-native';
import Register from '../Register/Register';
import styles from './styles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {prodcutDefaultImage} from '../../api/Product/Product';
import stripHtml from "string-strip-html";
import { connect } from 'react-redux'
class ProductsItems extends React.Component {

// Components/FilmItem.js

render() {
    const product = this.props.product
   
    return ( 

      <ScrollView  horizontal
      showsHorizontalScrollIndicator={true}
      >
         <TouchableHighlight onPress={()=>this.props.addItemToCart(product)} >
      <View style={styles.container}>
        <ImageBackground
          style={styles.photo}
          imageStyle={{ borderRadius: 15 }}
          source={{uri: prodcutDefaultImage(product.id,product.id_default_image) } }
        >
            { 
          product.my_price2<product.my_price &&
          
          <View
        style={
          styles.badge}
      >
        <Text
          style={{ fontSize: 13, color: "black" }}
          styleName="bright"
        >
          { Math.round((((parseFloat(product.my_price)-parseFloat(product.my_price2))/parseFloat(product.my_price))*100 )*100)/100}%
        </Text>
      </View>}



        </ImageBackground>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.category,{color:'green'}}>{product.my_price2<product.my_price && <Text style={{textDecorationLine:'line-through',color:'red'}}>{Math.round(product.my_price*100)/100} TND</Text>} {Math.round(product.my_price2*100)/100} TND</Text>
   
    <Text>{stripHtml(product.description_short)}</Text>
    
      </View>
      </TouchableHighlight>
      </ScrollView>
    )
}
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product })
  }
}
export default  connect(null, mapDispatchToProps)(ProductsItems);