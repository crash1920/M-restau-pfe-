import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import Register from '../Register/Register';
import styless from './styles';
import {GetCategorieImage,Getcategorie} from '../../api/Categories/Categories';
import CategoriesItems from './CategoriesItems';
import { Button } from 'native-base';
import SearchingBar from '../../components/SearchingBar';
import AsyncStorage from '@react-native-community/async-storage';
export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       headerTitle: <SearchingBar />,
        headerRight: <SearchingBar />
           
          
        
    };
};
  constructor(props) {
    super(props);
    this.state = {
      Categories :[]
    };
  }

  _loadCategories() {
    Getcategorie().then(data => { 
     
      this.setState({ Categories: data.categories });
      AsyncStorage.setItem('Categories', JSON.stringify(this.state.Categories));
  });
  
  AsyncStorage.getItem('Categories').then((cat) => { 
           
    console.log(cat)
    this.setState({ Categories: JSON.parse(cat) }) 
   
  
  }); 
  }
  
  componentDidMount() {
    
    this._loadCategories()
  }


  render() {
    
   
    return (
      <View style={styles.container}>
        <SearchingBar navigation={this.props.navigation}/>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.Categories }
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => { 
            return item.id;
          }}
          renderItem={({item}) => { if (item.id>2)   return ( <CategoriesItems  categorie={item} navigation = {this.props.navigation} />   )
          }}/>
          
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:'white',
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginHorizontal:2,
    marginVertical:4,
    flexBasis: '48%',
  },
  
  cardContent: {
    paddingVertical: 14.5,
    paddingHorizontal: 16,
  },
  
  cardImage:{
    height: 150,
    width: 198,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  title:{
    fontSize:50,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});     