   
import React from 'react';
import { StyleSheet, View, FlatList,Text,ScrollView} from 'react-native';
import Location, { Separator } from './Location';
import {  Icon} from 'native-base';
import { Button } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { connect ,useSelector} from 'react-redux';
import {adresses} from '../../api/UserLocation/Location';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {DeleteAddress} from '../../api/UserLocation/Location';
import { TouchableOpacity } from 'react-native-gesture-handler';
    class LocationScreen extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
         adresse : [] ,
         add:'',
         checked:"0" ,
         id_c:this.props.user.user.id,
         loca:{},
         update:false
        
          }
        }
        supprimer(id){
          DeleteAddress(id);
        this.setState({update:true})
      
         
        }

        ajout() {

          this.props.navigation.navigate('AjoutAdresse',{lan:this.state.loca.latitude,long : this.state.loca.longitude,
           })
           this.setState({update:true})
         
        }
         _loadadd(id) {
         
          adresses(id).then(data => {
            this.setState({adresse : data.addresses})
            AsyncStorage.setItem('adresse', JSON.stringify(this.state.adresse));
        })
      
        AsyncStorage.getItem('adresse').then((add) => { 
                 
                
          this.setState({ adresse: JSON.parse(add) }) 
         
      
    }); 
   
         }

        componentDidMount(){
      
  
          const mypostion = async  () => {
          await Geolocation.getCurrentPosition(
            (position) => {
              this.setState({ loca : position.coords});
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );  
       }

       mypostion();
       
       this._loadadd(this.state.id_c);
          
      
        }
        
   componentDidUpdate  (){
   
      if(this.state.update ==true  )
      {
      adresses(this.state.id_c).then(data => {
        this.setState({adresse : data.addresses});
        this.setState({update : false})   
    })
      }
      }        
     
        render() {
        
     
   let {update} = this.state;
   console.log(update)
          return (
            <View style = {{backgroundColor:'white',flex:1}} >
      <View style={styles.container}>
         
      <FlatList
      refreshing={update}
      onRefresh={()=>this.setState({update:true})}
        data={this.state.adresse}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>  {  return  (
            <ScrollView  style={{backgroundColor:'white'}}>
          
            <View style={{  flex: 1,
            flexDirection: 'row',
          
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 20,}}>
              
           
             
              <View style={{flexDirection: 'column',
             alignItems: 'flex-start',alignContent:'flex-start'}}> 
           <Text style={{fontFamily:'Arial',fontSize:15,color:'grey'}}>{item.alias}</Text>
           <View style={{   flex: 1,
            flexDirection: 'row',
          justifyContent: 'flex-end'}}>
          <Text style={{fontFamily:'Arial',fontSize:14,color:'black'}}> {item.address1} , {item.city} , {item.postcode} </Text>
        
          </View>
          </View> 
           <View style={{   flex: 1,
            flexDirection: 'row',
          justifyContent: 'flex-end'}}>
        
          </View>  
          
          <View style={{   flex: 1,
            flexDirection: 'row',
          justifyContent: 'flex-end'}}>

   
  </View>
  <TouchableOpacity onPress={()=>this.supprimer(item.id)}>
  <Icon  type='Feather' name='delete'><Text style={{fontSize:8}}>{'\n'}Supprimer</Text></Icon></TouchableOpacity>
  <TouchableOpacity onPress={()=>this.props.navigation.navigate('ModifierAdresse',{idadd:item.id,rue:item.address1,city:item.city,codepostale:item.postcode,alias:item.alias,lan:this.state.loca.latitude,long : this.state.loca.longitude})}>
  <Icon  type='Feather' name='edit'><Text style={{fontSize:8}}>{'\n'}Modifier</Text></Icon></TouchableOpacity>
  
         </View>
         </ScrollView>
        )} }
        ItemSeparatorComponent={() => <Separator />}
        />  
<Button  buttonStyle={styles.acceptButton}
      title=" ajouter une nouvelle adresse " onPress={()=>this.ajout()}></Button>

        </View>
        </View>
); }
} 
const mapStateToProps = (state) => {
    return {
        cartItems: state,
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) =>{dispatch({ type: 'REMOVE_FROM_CART', pid: id })} ,
        addItemToCart: (product) => {dispatch({ type: 'ADD_TO_CART', product: product })}
    }
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
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
      },
      acceptButton: {
        backgroundColor: 'black',
        borderRadius: 500,
        height: 45,
        marginTop: 10 ,
     
        marginLeft:15,
        marginRight:15,
        
      },
  });
export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);

