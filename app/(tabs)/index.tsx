import { Image, StyleSheet, Platform ,FlatList,Modal} from 'react-native';
import { useEffect,useState } from 'react';
import Detalle from '@/components/Detalle';
import { CardMenu } from '@/components/CardMenu';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMenu } from '@/contexts/MenuContext';

export default function HomeScreen() {
  const [modal,setModal]=useState(false)
  const [itemDetalle,setItemDetalle]=useState({});

  const {setMenu,menu,cantVegano,setCantVegano,puntajeSalud,setPuntajeSalud,listaIds }=useMenu()

  const [costo,setCosto]=useState(0)
  useEffect(()=>{
    let costos = 0;
    let cantVeganos = 0;
    let puntaje=0
    menu.map((i:any)=>{
      puntaje+=i.puntaje;
      costos += i.precio;
      if (i.vegano) {
      cantVeganos += 1;
    }})
    setCantVegano(cantVeganos)
    setCosto(costos);
    
    setPuntajeSalud((puntaje/menu.length).toFixed(2) || 0)
    
  },[menu])

  function eliminar(id:any) {
    console.log(id);
    setCantVegano(0)
    setCosto(0)
    setPuntajeSalud(0)
    setMenu(menu.filter((item:any)=>item.id!==id))
    
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/comida.jpg')}
          style={styles.reactLogo}
        />
      }>

        <Modal
          transparent={true}
          visible={modal}
          onRequestClose={() => {
          setModal(!modal);
          }}>
            <ThemedView style={styles.modal}>

              <Detalle setModal={setModal} eliminar={eliminar} agregar={null} item={itemDetalle}/>
            </ThemedView>

        </Modal>


        <ThemedText type="title">Menu</ThemedText>

        <ThemedView style={styles.titleContainer}>
          <ThemedText>Precio: ${costo}</ThemedText>
          <ThemedText>Veganos: {cantVegano}</ThemedText>
          <ThemedText>Promedio salud: {puntajeSalud}</ThemedText>

        </ThemedView>
        <FlatList
          data={menu}
          renderItem={({item})=><CardMenu item={item} eliminar={eliminar} agregar={null} setModal={setModal} setItemDetalle={setItemDetalle}/>}
        />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 2,
    borderColor: '#141414',
    borderRadius: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 380,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  modal:{
    height:'100%',
    overflow:'scroll',
    backgroundColor: '#14141450',

    
  },
});
