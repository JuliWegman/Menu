import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, StyleSheet,TextInput,Image} from 'react-native';
import { useState ,useEffect} from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { apiKey } from '@/constants/api';
import { FlatList } from 'react-native-gesture-handler';
import { CardMenu } from '@/components/CardMenu';
import { useMenu } from '@/contexts/MenuContext';
import Detalle from '../../components/Detalle'

export default function TabTwoScreen() {
  const [query,setQuery]=useState("")
  const [items,setItems]=useState([""])
  const [modal,setModal]=useState(false)
  const [itemDetalle,setItemDetalle]=useState({});
  const {setMenu,menu,listaIds,setListaIds,cantVegano,setCantVegano}=useMenu()
  var timer:any

  async function getPrecio(item:any) {
    const res=await axios.get("https://api.spoonacular.com/recipes/"+item.id+"/information"+apiKey);    
    item.precio=Number.parseInt(res.data.pricePerServing);
    item.vegano=res.data.vegan
    item.puntaje=Number.parseInt(res.data.healthScore)
    return item;

  }

  async function agregar(item:any){
    if(menu.length>=4){
      alert("NO PUEDEN HABER MÁS DE 4 PLATOS")
      return 0
    }
    if(menu.indexOf(item)!=-1){
      alert("YA ESTA EN EL MENU")
      return 0
    }
    item=await getPrecio(item)
    if (cantVegano>1 && item.vegano) {
      alert("No pueden haber más de 2 platos veganos")
      return 0
    }else if(menu.length-cantVegano>1 && !item.vegano){
      alert("Deben haber al menos 2 platos veganos")
      return 0
    }
    setMenu([...menu,item])
    setListaIds([...listaIds,item.id])
  }
   
  async function getData() {
    try{
    const res1=await axios.get("https://api.spoonacular.com/recipes/complexSearch"+apiKey+"&query="+query)
      setItems(res1.data.results)
    }catch(error :any){
      alert(error.message);
      
    }
  }

  useEffect(()=>{
    getData()
  },[])

  
  function handleChange(e:any) {
    setQuery(" ")
    if (e.length>2) {setQuery(e)}
    clearTimeout(timer)
    timer=setTimeout(getData,1000)
  }

  return (
    <>
   
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/pensando-comida.jpg')}
          style={styles.reactLogo}
        />
      }>
         <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
          setModal(!modal);
          }}>
            <Detalle setModal={setModal} agregar={agregar} eliminar={null} item={itemDetalle}/>
          </Modal>
      <ThemedView>
      <TextInput
          style={styles.input}
          onChangeText={(e)=>{handleChange(e)}}
          placeholder='¿Que queres comer hoy?'
        />
        
        {items.length>0 ?
        <FlatList
          data={items}
          renderItem={({item})=><CardMenu item={item} agregar={agregar} eliminar={null} setModal={()=>{setModal(true);setItemDetalle(item);}}/>}
        />
        :
        <ThemedText>No se encuentran platos</ThemedText>
        }
      </ThemedView>
    </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 250,
    width: 360,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  input:{
      width:300,
      height:40,
      borderRadius:20,
      backgroundColor:'#fafafa',
      marginBottom: '10%',
      borderWidth: 1,
      borderColor: '#141414',
      padding:'5%'

  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
