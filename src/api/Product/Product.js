import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import{api_url,api_key} from '../config' ; 
import AsyncStorage from '@react-native-community/async-storage';

  export async function product(){
    try {
          const response = await fetch(api_url + 'products?display=[name,id,id_default_image,my_price,my_price2,description_short,description]&price[my_price][use_reduction]=0&price[my_price2][use_reduction]=1&' + api_key);
          return await response.json();
         
      }
      catch (error) {
          console.error(error);
      }

    }
 export function prodcutDefaultImage (id,id_default_image) 
 {
 return  api_url+"images/products/"+id+"/"+id_default_image+"/?"+api_key;

 }

 export function getimages (idimage,id) 
 {
 return  api_url+"images/products/"+id+"/"+idimage+"/?"+api_key;

 }

 export async function ProductByCateg(id){
  try {
       const response = await fetch(api_url + 'products?display=[id_category_default,name,id,id_default_image,description_short,price,my_price,my_price2,description,my_price]&price[my_price][use_reduction]=0&price[my_price2][use_reduction]=1&filter[id_category_default]=['+id+']&' + api_key);
        return await response.json();
    }
    catch (error) {
        console.error(error);
    }

  }

export async function imagesarray (id) {
try {
const response =await  fetch(api_url+'images/products/'+id+'/?'+api_key);
return await response.json()

}
catch (error) {
  console.error(error);
}

}



export async function SearchProducts(text){
  try {
        const response = await fetch(api_url + 'products?display=[name,id,id_default_image,my_price,my_price2,description_short,description]&price[my_price][use_reduction]=0&price[my_price2][use_reduction]=1&filter[name]=%['+text+']%&' + api_key);
        return await response.json();
    }
    catch (error) {
        console.error(error);
    }

  }
 