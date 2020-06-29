import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";



import { connect } from 'react-redux'
import { Icon  } from 'native-base';

class CartIcon extends React.Component {
    render() {
        const transformedCartItems = [];
        for (const key in this.props.cartItems.cart.items) {
          transformedCartItems.push({
            productId: key,
            productTitle: this.props.cartItems.cart.items[key].productTitle,
            productPrice: this.props.cartItems.cart.items[key].productPrice,
            quantity: this.props.cartItems.cart.items[key].quantity,
            sum: this.props.cartItems.cart.items[key].sum
          });
        }
    return(
    <View style={{ padding: 5 }}>
        <View style={{
            position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: 'rgba(95,197,123,0.8)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{transformedCartItems.length}</Text>
        </View>
        <Icon name="cart" />
    </View>
);}}

const mapStateToProps = (state) => {
   
      return {
        cartItems: state
    }
}
    
export default connect(mapStateToProps)(CartIcon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }});