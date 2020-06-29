import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
  ScrollView
} from 'react-native';
import {prodcutDefaultImage} from '../../api/Product/Product';
import { connect } from 'react-redux'
 class ProductsItemsWr extends React.Component {

render() {
    const product = this.props.all

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ProductDetails',
                {prod:product})}   useForeground>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.image} source={{uri: prodcutDefaultImage(product.id,product.id_default_image) } }/>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price,{color:'green'}}>{product.my_price2<product.my_price && <Text style={{textDecorationLine:'line-through',color:'red'}}>{Math.round(product.my_price*100)/100} TND</Text>} {Math.round(product.my_price2*100)/100} TND</Text>
            </View>
            <View style={styles.actions}>
              <Button
                onPress={()=>this.props.navigation.navigate('ProductDetails',
                {idprod:product.id,
                  desc:product.description,
                pname:product.name})}  
                title="Voir details"
               
              />
              <Button
               
                title="ajouter "
                onPress={()=>this.props.addItemToCart(product)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product })
  }
}
export default  connect(null, mapDispatchToProps)(ProductsItemsWr);
const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});


