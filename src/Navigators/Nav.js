
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
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux'
import SettingsScreen from '../screens/Settings/SettingsScreen';
import Login from '../screens/Login/Login';
import HomeScreen from '../screens/Home/HomeScreen';
import Register from '../screens/Register/Register';
import SearchScreen from '../screens/Search/SearchScreen';
import SearchingBar from '../components/SearchingBar';
import CartIcon from '../components/CartIcon';
import ProductsCateg from '../screens/ProductsCateg/ProductsCateg';
import CartScreen from '../screens/Cart/CartScreen';
import { Icon  } from 'native-base';
import UserScreen from '../screens/User/UserScreen';
import CategoriesItems from '../screens/Search/CategoriesItems'
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import PorductsInCart from '../screens/Cart/ProductsInCart';
import Searched from '../screens/SearchedProducts/Searched'
import Auth from '../components/Auth'
import Orders from '../screens/Orders/Orders';
import LivraisonScreen from '../screens/Livraison/LivraisonScreen'
import ValiderScreen from '../screens/ValiderScreen/ValiderScreen'
import LocationScreen from '../screens/Location/LocationScreen'
import AjoutAdresse from '../screens/Location/AjoutAdresse';
import ModifierAdresse from '../screens/Location/ModifierAdresse'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Stack =createStackNavigator();
const Tab =createBottomTabNavigator();
function Search() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search"
       component={SearchScreen} 
       options={{headerTitle: null,
                 headerTransparent:true}} 
       
       />
     
       <Stack.Screen name="ProductsCateg" component={ProductsCateg}   initialParams={{ idcat: 1}}
        options={({ route }) => ({ title: route.params.namecat })} />  
        <Stack.Screen name="ProductDetails" component={ProductDetails}  
        options={({ route }) => ({ title: route.params.prod.name })} />  
       
       <Stack.Screen name="resultats de recherche" component={Searched}  
        />  
       
    
    </Stack.Navigator>
  );
}



function home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails}  
        options={({ route }) => ({ title: route.params.prod.name })} />  
       
    </Stack.Navigator>
  );
}
function cart () {
return(
<Stack.Navigator>
      <Stack.Screen name="panier" component={PorductsInCart} />
      <Stack.Screen name="ProductDetails" component={ProductDetails}  
        options={({ route }) => ({ title: route.params.prod.name })} />  
       
    </Stack.Navigator>
);
}

function Tabu () {
  return (
  
    <Tab.Navigator
       initialRouteName="home"
       tabBarOptions={{
         activeTintColor: 'green',
       }}
     >
       <Tab.Screen
         name="home"
         component={home}
         options={{
           tabBarLabel: 'Accueil',
           showIcon:'true',
           tabBarIcon:  ({ color, size }) => ( 
             <Icon name="home"  color={color} size={size}  />
           ),
         }}
       />
       <Tab.Screen
         name="Search"
         component={Search}
         options={{
           tabBarLabel: 'Recherche',
           tabBarIcon:  ({ color, size }) => ( 
             <Icon name="search"  color={color} size={size}  />
           ),
         }}
       />
       
        <Tab.Screen
         name="panier"
         component={cart}
         options={{
           
           tabBarLabel: 'panier',
           tabBarIcon:  () => ( 
             <CartIcon/>
           ),
         }}
       />
       <Tab.Screen
         name="settings"
         component={ Auth}
         options={{
           
           tabBarLabel: 'Mon compte',
           tabBarIcon:  ({ color, size }) => ( 
             <Icon name="person"  color={color} size={size}  />
           ),
         }}
       />
     </Tab.Navigator>
   
  );}
class Nav extends React.Component {
  render() {
    
  return (
    <NavigationContainer>  
  <Stack.Navigator>
      <Stack.Screen name="Tabulation" component={Tabu} options={{headerTitle: null,
                 headerTransparent:true}} />
      <Stack.Screen name="Orders" component={Orders}  options={{headerTitle:"Votre Commande",
              headerTintColor:'red',}}
        />  
       
          <Stack.Screen name="Livraison" component={LivraisonScreen}  options={{headerTitle:"choisissez le lieu de livraison ",
              headerTintColor:'red',}}
        />
          <Stack.Screen name="Location" component={LocationScreen}  options={{headerTitle:"choisissez le lieu de livraison ",
              headerTintColor:'red',}}
        />  
            <Stack.Screen name="AjoutAdresse" component={AjoutAdresse} options={{headerTitle:"Ajouter une adresse de livraison ",
           }}/>
           <Stack.Screen name="ModifierAdresse" component={ModifierAdresse} options={{headerTitle:"Modifier cette adresse de livraison ",
           }}/>
 <Stack.Screen name="terminer" component={ValiderScreen}  options={{headerTitle:"terminez la commande",
        headerTintColor:'red',}} />  
       
    </Stack.Navigator>
    </NavigationContainer>
  );
}}
const mapStateToProps = (state) => {
  return {
      user: state
  }
}
        
        export default connect(mapStateToProps,null)(Nav);