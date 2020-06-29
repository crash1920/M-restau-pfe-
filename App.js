/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import Nav from './src/Navigators/Nav'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import cartItems from './src/store/reducers/cartItems';

import users from './src/store/reducers/users'

const rootReducer = combineReducers({
  cart: cartItems,
 user:users
});

const store = createStore(rootReducer);

class App extends React.Component {
  
 render()
 
   {

  return (
    <Provider store={store}>
   <Nav/>
   </Provider>
  );}
}


export default App;
