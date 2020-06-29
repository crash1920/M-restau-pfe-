import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";

import { connect } from 'react-redux'
import ProductsInCart from './ProductsInCart'
class CartScreen extends Component {

    render() {
       

        return (
            <View style={styles.container}>
                {this.props.cartItems.length > 0 ?
                   <FlatList
                     vertical
                     showsVerticalScrollIndicator={true}
                     numColumns={2}
                     data={this.props.cartItems}
                     keyExtractor ={(item) => item.id.toString()}
                     renderItem={({item}) => {return( <ProductsInCart product={item}/>) }}
                    
                     />
                    : <Text>No items in your cart</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}




export default connect(mapStateToProps, null)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});