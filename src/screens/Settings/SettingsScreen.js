import React from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet} from 'react-native';
import Register from '../Register/Register';
import Counter from "react-native-counters";
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,ListItem,Switch,List } from 'native-base';



class SettingScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
  products : []
  }
}


  render() {
  console.log()
  let log = "Login" ; 
  if(this.props.user.user.token!==null)
  log="user"
    return (
      <Container>
     
     <Content>
          <ListItem icon onPress={() => this.props.navigation.navigate(log)}>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Mon compte</Text>
            </Body>
            <Right>
            <Text>se connecter </Text>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
      
          <ListItem icon onPress={() => this.props.navigation.navigate('location')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active  type ='SimpleLineIcons'  name='location-pin' />
              </Button>
            </Left>
            <Body>
              <Text>Adresses de livraison</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

        </Content>
      </Container>
       );
  }
}
const mapStateToProps = (state) => {
  return {
      user: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    SAVE_USER: (tok,em,firstname,lastname,password,id) =>{dispatch({ type: 'SAVE_USER', token: tok,email:em, firstname:firstname ,lastname:lastname, password:password,id:id })}
      
  }
}

        
        export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen)
