import AsyncStorage from '@react-native-community/async-storage';
const initialState = {
  email:null,
 token: null,
  firstname:null,
 lastname:null,
 password:null,
 id:null,
 sk:null,
};
const users = (state = initialState, action) => {
 
  switch (action.type) {

    case 'SAVE_USER':
    
    return {
        ...state,
       email:action.email,
       firstname:action.firstname,
       lastname:action.lastname,
       password:action.password,
        token: action.token ,
       id:action.id,
       sk:action.sk,

      };
      case 'logout':
      
             AsyncStorage.removeItem('token');
             AsyncStorage.removeItem('sessionId');
                 
             return {
                ...state,
                email:null,
                token:null,
                firstname:null,
                lastname:null,
                password:null,
                id:null,
                sk:null
              };
            
         
  } return state;
};
export default users ; 