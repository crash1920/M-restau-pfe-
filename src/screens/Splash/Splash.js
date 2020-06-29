import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,StyleSheet} from 'react-native';

export default class Splash extends React.Component {

  constructor(props){
    super(props);
   
  }

  
  render()
   { 
  return (
   
  <View style = {{backgroundColor: '#ffffff',flex:1 }} >
<Image  style={styles.logo} source={require('../../../Assets/logo.png')} />
</View>
  );}
}

const styles = StyleSheet.create({

logo : {
    width:'100%',
    height:'60%',
    top:110,
    alignItems:'center',
    justifyContent:'center',
    position : 'absolute'
 }


})


