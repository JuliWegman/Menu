import { Image, StyleSheet, Platform ,FlatList} from 'react-native';
import { useEffect,useState } from 'react';

import { CardMenu } from '@/components/CardMenu';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMenu } from '@/contexts/MenuContext';

export default function HomeScreen() {
  const {getDetalles,setMenu,menu,cantVegano,setCantVegano}=useMenu()

  const [costo,setCosto]=useState(0)
  useEffect(()=>{
    let costos = 0;
    let cantVeganos = 0;
    menu.map((i:any)=>{
      costos += i.precio;
      console.log(i.vegano)
      if (i.vegano) {
      cantVeganos += 1
    }})
    setCantVegano(cantVeganos)
    setCosto(costos);
    
  },[menu])

  function eliminar(id:any) {
    setCantVegano(0)
    setCosto(0)
    setMenu(menu.filter((item:any)=>item.id!==id))
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
        <ThemedText>Precio: ${costo}</ThemedText>
        <ThemedText>veganos: {cantVegano}</ThemedText>
      </ThemedView>
        <FlatList
          data={menu}
          renderItem={({item})=><CardMenu item={item} eliminar={eliminar} agregar={null} />}
        />
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
