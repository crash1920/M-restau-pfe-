import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  badge: {
    backgroundColor: "#3fe054",
   
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:'30%',
    left:123
  },
});

export default styles;
