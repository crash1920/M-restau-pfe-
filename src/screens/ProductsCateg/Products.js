
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, ImageBackground,StyleSheet} from 'react-native';
import Register from '../Register/Register';
import styles from './styles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {prodcutDefaultImage,prixttc,tax} from '../../api/Product/Product';
import stripHtml from "string-strip-html";
import { test } from '../../api/Product/Product';
export default class Products extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      rate : ""
  }
 
}


 
render() {
 
 const navigation  =this.props.navigation;
  const product = this.props.product;
  
     return (
      <TouchableHighlight  onPress={()=>navigation.navigate('ProductDetails',
      {prod:product })}  >
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
          -{((parseFloat(product.my_price)-parseFloat(product.my_price2))/parseFloat(product.my_price))*100}%
        </Text>
      </View>}
      </ImageBackground>
    <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.category,{color:'green'}}>{product.my_price2<product.my_price && <Text style={{textDecorationLine:'line-through',color:'red'}}>{Math.round(product.my_price*100)/100} TND</Text>} {Math.round(product.my_price2*100)/100} TND</Text>
   
    <Text style={styles.category}>{stripHtml(product.description_short)}</Text>
    
      </View>
      </TouchableHighlight>
    )
}
}
