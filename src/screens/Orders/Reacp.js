import React,{Component} from 'react';
import { FlatList, ScrollView, View, TouchableHighlight, Image,StyleSheet, ImageBackground, Animated,Text,TouchableOpacity,Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    text: {
      color: '#4a4a4a',
      fontSize: 15,
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#e4e4e4',
      marginLeft: 10,
    },
    number:{
    
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
color: '#444444',
marginTop:10,
marginRight: 5,
marginLeft: 5,
    }, rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        // flex: 1,
        alignItems: 'flex-end',
      },
      actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
      },summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
      },
      summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
      },
      amount: {
        color: 'red'
      }
  });

const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightAction}>
          <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
class Recap extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };}

    render() {
        const product=this.props.product
 
         this.state.count = product.quantity
     
    
      return (
        
        <Swipeable   
   
        
        renderRightActions={(progress, dragX) => (
            <RightActions progress={progress} dragX={dragX} onPress={()=>this.props.onRightPress(product.id)} />
          )}>
        <View style={{  flex: 1,
          flexDirection: 'row',
        
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 20,}}>
            
          
         <View style={{flexDirection: 'column',
           alignItems: 'flex-start',alignContent:'flex-start'}}> 
         
        <Text style={styles.text}>   X{product.quantity}  {product.name}</Text>
      
        </View>  
     
        <View style={{   flex: 1,
          flexDirection: 'row',
        justifyContent: 'flex-end'}}>
      
</View>
<Text style={{color:'green'}}>  {product.my_price2<product.my_price2 && <Text style={{textDecorationLine:'line-through',color:'red'}}>{Math.round( (product.my_price2*product.quantity)*100)/100} TND</Text>} {Math.round((product.my_price2*product.quantity)*100)/100} TND</Text>
   
     
       </View>
       
       </Swipeable>
     
        
  );
      } }
    
    
  export default Recap;