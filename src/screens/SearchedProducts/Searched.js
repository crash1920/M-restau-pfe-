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
  TextInput,Button
} from 'react-native';
import Products from '../ProductsCateg/Products'
import {SearchProducts} from '../../api/Product/Product'
import AsyncStorage from '@react-native-community/async-storage';
export default class Searched extends React.Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      searchedText: this.props.route.params.searched,

  prod : []
  }
  
  
}

  _getproducts () {
    if (this.state.searchedText.length > 0) {
     
      SearchProducts(this.state.searchedText).then(data => {
        this.setState({ prod: data.products }) ;
        if(this.state.prod !== undefined)
        AsyncStorage.setItem('prodi', JSON.stringify(this.state.prod));
    })
    
  AsyncStorage.getItem('prodi').then((pro) => { 
           
          
    this.setState({ prod: JSON.parse(pro) }) 
   
  
  }); 
   
    }
  
  }
  componentDidMount(){
 this._getproducts();

  }

    render() {
      
       console.log(this.state.searchedText)
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
        )
    }


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
