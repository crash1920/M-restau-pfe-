/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './src/screens/Splash/Splash';
import React from 'react';
import Register from './src/screens/Register/Register';
import HomeScreen from './src/screens/Home/HomeScreen';
class Main extends React.Component {

constructor(props) {
super(props);
this.state =  {currentScreen:'Splash'};
setTimeout(()=>{
    this.setState({currentScreen:'App'})


},2000)

}


render() 
{
    const{currentScreen} =this.state
    let mainScreen =currentScreen === 'Splash' ? <Splash/> :<App/>
return mainScreen
}

}


AppRegistry.registerComponent(appName, () => Main);
