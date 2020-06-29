import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';


  export function product(){
    return fetch('http://192.168.137.34/presta/api/products/?display=[name,id,id_default_image]&ws_key=3CRIH754PKISF3ZN5UU8GGK9622EL1BH')
      .then((response) => response.json()  )

      .catch((error) =>{
        console.error(error);
      });

    }
 


  
