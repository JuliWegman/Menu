import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { apiKey } from "../../constants/api";
import { CardMenu } from '@/components/CardMenu';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [items,setItems]=useState([""])
  const [cargando,setCargando]=useState(true)
  const [detalles,setDetalles]=useState({})
  const [menu,setMenu]=useState([""])
  useEffect(()=>{

    async function getData(){
      const res1=await axios.get("https://api.spoonacular.com/recipes/complexSearch"+apiKey)
      setItems(res1.data.results)
      setCargando(false)
    }

    getData()
  },[])


  function eliminar() {
    
  }
  async function getDetalles(id:number) {
    const res=await axios.get("https://api.spoonacular.com/recipes/"+id+"/information"+apiKey)
    setDetalles(res.data)
  }

if (cargando) {
  return <ThemedView><ThemedText type="subtitle">Cargando...</ThemedText></ThemedView>
}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Menu</ThemedText>
      </ThemedView>
        <CardMenu title={items[0].title} img={items[0].image} getDetalles={getDetalles} eliminar={eliminar} />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
