import AsyncStorage from '@react-native-community/async-storage';

export async function  login(email, password)  {
    
      const response = await fetch(
        'http://192.168.137.1/Myrestau/test.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          
          })
        }
      ).then((response) => response.json()).then((responseJsonFromServer) =>
      { 
          if(responseJsonFromServer!="Invalid Username or Password Please Try Again")
          

          {   
             AsyncStorage.setItem('token', responseJsonFromServer.token);
             AsyncStorage.setItem('email', responseJsonFromServer.email);
             AsyncStorage.setItem('fn', responseJsonFromServer.firstname );
             AsyncStorage.setItem('ln', responseJsonFromServer.lastname);
             AsyncStorage.setItem('id', responseJsonFromServer.id);
             AsyncStorage.setItem('sk', responseJsonFromServer.secure_key);
        } 
        else { 
         
          console.log(responseJsonFromServer)
        }

      }).catch((error) =>
      {
          console.error(error);

      });
    };

  