import{api_url,api_key} from '../config' ; 
import { cos } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';


export  async function  PostOrder (id_add,id_c,sk,total,res=[],cart_id)
    {  
       

            fetch(api_url+'orders?schema=blank&'+api_key,
            {
                method: 'POST',
                headers: 
                {  'Authorization': 'Basic '+api_key,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                 'order': {
                     'id_address_delivery':id_add,
                     'id_currency':1,
                       'id_lang':'1',
                       'secure_key':sk,
                       'id_shop_group':'1',
                       'id_carrier':'6',
                       'id_guest':'1',
                       'payment':"chéque",
                        'module':'ps_checkpayment',
                       'id_cart':   cart_id ,
                        'id_customer':id_c,
                        'total_paid':total,
                        'total_paid_real':'0.000000',
                        'total_products':total,
                       'total_products_wt':total,
                       'id_address_invoice':id_add,
                       'conversion_rate':'1.000000'
                      
                }
                })
               
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                console.log(responseJsonFromServer);
                
               

            }).catch((error) =>
            {
                console.error(error);

            });
        }

        export  async function  PostCart (id_add,id_c,sk,res=[])
    {  
  

          await  fetch(api_url+'carts?schema=blank&'+api_key,
            {
                method: 'POST',
                headers: 
                {  'Authorization': 'Basic '+api_key,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify({
                 'cart': {
                     'id_address_delivery':id_add,
                     'id_address_invoice':id_add,
                     'id_currency':1,
                     'id_customer':id_c,
                       'id_lang':'1',
                       'secure_key':sk,
                       'id_shop_group':'1',
                       'id_carrier':'6',
                       'id_guest':'1',
                       'delivery_option':"{\""+id_add+"\":\"6,\"}",
                     'associations':{
                     'cart_rows':res
                     }
                    }
                })
               
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
              
                  AsyncStorage.setItem('cart_id', responseJsonFromServer.cart.id );


            }).catch((error) =>
            {
                console.error(error);

            });
        }