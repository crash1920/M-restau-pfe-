import{api_url,api_key} from '../config' ; 

import AsyncStorage from '@react-native-community/async-storage';
export  async function  UpdateCustomer (a,b,c,d,id,idshopgroup,sk)
    {  
       
                console.log(idshopgroup),
            fetch(api_url+'customers/'+id+'?'+api_key,
            {
                method: 'PUT',
                headers: 
                {   'Authorization': ' Basic HAN4I5SIUZ4Z1783LTV7MGZQ63ENAYCH',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                 'customer': {
                     'active':idshopgroup,
                    'id_shop_group':idshopgroup,
                    'id_shop':idshopgroup,
                     'id':id,
                  'firstname' :  a,

                 'lastname' : b,

                 'passwd' :c,

                 'email' :d,
                  'secure_key':sk

                }
                })
               
            }).then((response) => response.text()).then((responseJsonFromServer) =>
            {
               
                 AsyncStorage.setItem('email',d);
                AsyncStorage.setItem('fn', a );
                AsyncStorage.setItem('ln', b);
                AsyncStorage.setItem('passwd',c)
                console.log(responseJsonFromServer);

               

            }).catch((error) =>
            {
                console.error(error);

            });
        }
