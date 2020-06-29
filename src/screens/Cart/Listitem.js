import Swipeable from 'react-native-gesture-handler/Swipeable';
import React,{Component} from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet, ImageBackground, Animated,Text,TouchableOpacity,Button } from 'react-native';

import {prodcutDefaultImage} from '../../api/Product/Product';
import { connect } from 'react-redux'


  export const Separator = () => <View style={styles.separator} />;
  
  
  
  const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightAction}>
          <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  class ListItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };}

    render() {
        const product=this.props.product
 
         this.state.count = product.quantity
     
  
      return (
        
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductDetails',
        {prod:product})}     >
        <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 20,}}>
            
               <Image
          style={{width:80,height:60}}
          source={{uri: prodcutDefaultImage(product.id,product.id_default_image) } }
        />
         <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         
        <Text style={styles.text}>   X{product.quantity}  {product.name}</Text>
        <Text style={{color:'green'}}>  {product.my_price2<product.my_price2 && <Text style={{textDecorationLine:'line-through',color:'red'}}>{Math.round(product.my_price2*100)/100} TND</Text>} {Math.round(product.my_price2*100)/100} TND</Text>
        </View>  
     
        <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
        <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,20)',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#fff',
       borderRadius:50,

     }}onPress={()=>this.props.onRightPress(product.id)} ><Text>-</Text></TouchableOpacity>
 

</View>
       <Text style={styles.number}>{product.quantity}</Text>
   
       <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(10,0,0,20)',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#fff',
       borderRadius:50,
     }}   onPress={()=>this.props.onLeftPress(product)} ><Text>+</Text></TouchableOpacity>
       </View>
       
       </TouchableOpacity>
     
        
  );
      } }
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
        }
      });
      
    
  export default ListItem;