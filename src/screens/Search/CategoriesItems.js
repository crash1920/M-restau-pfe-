import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import Register from '../Register/Register';
import styless from './styles';
import {GetCategorieImage,Getcategorie} from '../../api/Categories/Categories';

export default class CategoriesItems extends React.Component { 
        
  constructor(props) {
    super(props);
    
  }
  


  onPressCategory = (categorie ) => {
    const id = categorie.id;
   const name = categorie.name;
    this.props.navigation.navigate('ProductsCateg',{idcat:id,namecat:name});
  };


   
    render() {
        
      const categorie = this.props.categorie
        return (
            <TouchableOpacity style={styles.card}     
            onPress={() => this.onPressCategory(categorie)    }      >
                
            <ImageBackground style={styles.cardImage} source={{uri:GetCategorieImage(categorie.id)}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'stretch',backgroundColor:'rgba(30,30,30,0.5)'}} >
              <Text style={{backgroundColor:'transparent',color:'white'}}>{ categorie.name}</Text>
            
            </View>   
            </ImageBackground>
          </TouchableOpacity>
        )
    }

s
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    list: {
      //paddingHorizontal: 5,
      backgroundColor:"#E6E6E6",
    },
    listContainer:{
      alignItems:'center'
    },
    /******** card **************/
    card:{
      marginHorizontal:2,
      marginVertical:4,
      flexBasis: '48%',
    },
    
    cardContent: {
      paddingVertical: 14.5,
      paddingHorizontal: 16,
    },
    
    cardImage:{
      height: 150,
      width: 198,
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center'
    },
    title:{
      fontSize:50,
      flex:1,
      color:"#FFFFFF",
      fontWeight:'bold'
    },
    subTitle:{
      fontSize:12,
      flex:1,
      color:"#FFFFFF",
    },
    icon:{
      height: 20,
      width: 20, 
    }
  });     
