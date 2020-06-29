import React from 'react';
import { StyleSheet, View, FlatList,Text,Button} from 'react-native';
import ListItem, { Separator } from './Listitem';
import { connect ,useSelector} from 'react-redux'


 class PorductsInCart extends React.Component {
  render() {
    const transformedCartItems = [];
    for (const key in this.props.cartItems.cart.items) {
      transformedCartItems.push({
        id: key,
        name: this.props.cartItems.cart.items[key].productTitle,
        my_price2: this.props.cartItems.cart.items[key].productPrice,
        quantity: this.props.cartItems.cart.items[key].quantity,
        sum: this.props.cartItems.cart.items[key].sum,
        id_default_image:this.props.cartItems.cart.items[key].id_default_image,
        description : this.props.cartItems.cart.items[key].desc
      });
    }
    const tok =  this.props.user.user.token ;
    return (
        
      <View style={styles.container}>
         
        <FlatList
          data={transformedCartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>  {return  (
            <ListItem
            
              product={item}
              navigation={this.props.navigation}
              onRightPress={this.props.removeItem}
              onLeftPress={this.props.addItemToCart}
            />
          )} }
          ItemSeparatorComponent={() => <Separator />}
          />  

     
        
           <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
         <Text style={{color:'red',fontSize:20}}>{this.props.cartItems.cart.totalAmount} TDN</Text>  
        </Text>
        <View style={[{ width: "40%",}]}>
        <Button
         color='red'
          title="commander maintenant"
          disabled={transformedCartItems.length === 0}
          onPress={()=>tok !== null ? this.props.navigation.navigate('Orders') : alert("vous devez vous connectez pour passer une commande ")}
        />
        </View>
      </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state,
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) =>{dispatch({ type: 'REMOVE_FROM_CART', pid: id })} ,
        addItemToCart: (product) => {dispatch({ type: 'ADD_TO_CART', product: product })}
    }
  }
const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: 'red'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PorductsInCart);

