import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import{api_url,api_key} from '../config' ; 

  export async function Getcategorie(){
    try {
          
            
          const response = await fetch(api_url + '/categories?display=[name,description,id]&' + api_key);
          return await response.json();
        }
      catch (error) {
          console.error(error);
      }

    }
    
 export function GetCategorieImage (id) 
 { 
     if(id >= 10)
 return  api_url+"/images/categories/"+id+"/"+"?"+api_key;

 }


  
