const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
  
  backgroundColor:"white"
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 60,
  marginBottom: 160,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: 'black',
  borderRadius: 500,
  height: 45,
   width:190,
  
  marginLeft:110,
  marginRight:15,
  
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
logo : {
  width:80,
  height:250, 
  marginLeft:170,
  alignItems:'center',
  justifyContent:'center',
  flex:1,flexDirection:'column',
}
};
