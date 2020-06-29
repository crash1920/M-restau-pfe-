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

import { SearchBar } from 'react-native-elements';
export default class SearchingBar extends React.Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',

  prod : []
  }
  
  
}

updateSearch = search => {
  this.setState({ search });
};

    render() {
      const { search } = this.state;
       
        return (
          <View>
          <SearchBar containerStyle={{ backgroundColor:'white' , borderWidth: 5, borderRadius: 5,borderColor:'white',
          borderBottomColor:'white',borderTopColor:'white'}}  inputContainerStyle={{backgroundColor:'#dedede'}}
          placeholder='Chercher votre produit' onChangeText={this.updateSearch}
        value={search}
            onSubmitEditing={() =>  this.props.navigation.navigate("resultats de recherche",{searched:this.state.search})} />
       
      
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
