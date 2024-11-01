import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { useMenu } from '@/contexts/MenuContext';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect ,useState} from 'react';
import { apiKey } from '@/constants/api';
import { FlatList } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
    const [cargando,setCargando]=useState(true)
    const {idDetalles,detalles,setDetalles}=useMenu()
     useEffect(()=>{
         async function getData() {
              const res=await axios.get("https://api.spoonacular.com/recipes/"+idDetalles+"/information"+apiKey)
             setDetalles(res.data)
             setCargando(false)
      
         }
         setCargando(true)
         getData()
     },[idDetalles])
    if (cargando) {
        return <ThemedText>cargando...</ThemedText>
    }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView>
        <ThemedText>Tiempo de preparación: {detalles.cookingMinutes}</ThemedText>
        {detalles.vegetarian && <ThemedText>-vegetariano</ThemedText>}
        {detalles.vegan && <ThemedText>-vegano</ThemedText>}
        {detalles.glutenFree && <ThemedText>-libre de gluten</ThemedText>}
        {detalles.diaryFree && <ThemedText>-libre de lactosa</ThemedText>}
        {detalles.cheap && <ThemedText>-barato</ThemedText>}
        <ThemedText>Puntaje de salud: {detalles.healthScore}</ThemedText>



      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
