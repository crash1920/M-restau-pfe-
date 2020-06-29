
import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight,TouchableOpacity, Image,StyleSheet,Dimensions,} from 'react-native';
import Register from '../Register/Register';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import {prodcutDefaultImage,prixttc,tax} from '../../api/Product/Product';
import stripHtml from "string-strip-html";
import { imagesarray,getimages } from '../../api/Product/Product';
import AsyncStorage from '@react-native-community/async-storage';
import { connect ,useSelector} from 'react-redux'
const { width: viewportWidth } = Dimensions.get('window');

 class Products extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      Imagesid : []
  }
 id=this.props.route.params.prod.id;

}
loadimages() {
  imagesarray(id).then(data => {
    this.setState({ Imagesid: data[""]})
    AsyncStorage.setItem('Imagesid', JSON.stringify(this.state.Imagesid));
}).catch((error)=>{
  console.log("Api call error");
  alert(error.message);
});

AsyncStorage.getItem('Imagesid').then((imgid) => { 
         
     
  this.setState({ Imagesid: JSON.parse(imgid) }) 
 

}); 
}
componentDidMount() {
  this.loadimages();
 
   
 }
 
render() {
 
 let quantity = 0; 

 
  for (const key in this.props.cartItems.cart.items) {if(key==this.props.route.params.prod.id  )
   quantity= this.props.cartItems.cart.items[key].quantity
  }
 
 
    return (
        <ScrollView style={styles.container}>
     
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <FlatList
             snapToAlignment={"start"} 
             horizontal
             decelerationRate={"fast"}
             pagingEnabled
              data={this.state.Imagesid}
              keyExtractor ={(item) => item.id}
              renderItem={({item}) =>  {  if(item.id>id)  return(
                <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{ uri: getimages(item.id,id) }} />
                </View>

                
                </ScrollView>
              )}}
          
            />
            </View>
          
        </View>
        <View style={styles.infoRecipeContainer}>
              <Text style={styles.infoRecipeName}>{this.props.route.params.prod.name}</Text>
       
          <View style={styles.infoContainer}>
          <Image style={styles.infoPhoto} source={require('../../../Assets/time.png')} />
            <Text style={styles.infoRecipe}>time minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{stripHtml( this.props.route.params.prod.description)} </Text>
          </View>
          <View style={{   flex: 2,
          flexDirection: 'row',
        justifyContent: 'center'}}>
        <TouchableOpacity  disabled ={ quantity == 0 ? true : false}
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,20)',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#fff',
       borderRadius:50,

     }}onPress={()=>this.props.removeItem(this.props.route.params.prod.id)} ><Text>-</Text></TouchableOpacity>
 
 <Text style={{ 
        
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop:10,
        marginRight: 5,
        marginLeft: 5,
            }}>{quantity}</Text>

     
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
     }}   onPress={()=>this.props.addItemToCart(this.props.route.params.prod)} ><Text>+</Text></TouchableOpacity>
      
      </View>
        </View>
        
        

        </ScrollView>
        
    )
}
}
const mapStateToProps = (state) => {
  return {
      cartItems: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      removeItem: (id) =>{dispatch({ type: 'REMOVE_FROM_CART', pid: id })} ,
      addItemToCart: (product) => {dispatch({ type: 'ADD_TO_CART', product: product })}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Products);