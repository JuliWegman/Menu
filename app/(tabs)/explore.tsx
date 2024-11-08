import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform ,TextInput} from 'react-native';
import { useState ,useEffect} from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { apiKey } from '@/constants/api';
import { FlatList } from 'react-native-gesture-handler';
import { CardMenu } from '@/components/CardMenu';
import { useMenu } from '@/contexts/MenuContext';
export default function TabTwoScreen() {
  const [query,setQuery]=useState("")
  const [items,setItems]=useState([""])
  const {setMenu,menu,listaIds,setListaIds,cantVegano,setCantVegano}=useMenu()
  var timer:any

  async function getPrecio(item:any) {
    const res=await axios.get("https://api.spoonacular.com/recipes/"+item.id+"/information"+apiKey);    
    item.precio=Number.parseInt(res.data.pricePerServing);
    item.vegano=res.data.vegan
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
      alert("DEMASIADOS VEGANOS")
      return 0
    }else if(menu.length-cantVegano>1 && !item.vegano){
      alert("DEMASIADOS NO VEGANOS")
      return 0
    }
    setMenu([...menu,item])
    setListaIds([...listaIds,item.id])
  }
   
  async function getData() {
    const res1=await axios.get("https://api.spoonacular.com/recipes/complexSearch"+apiKey+"&query="+query)
      setItems(res1.data.results)
  }

  useEffect(()=>{
    getData()
  },[])

  
  function handleChange(e:any) {
    if (e.length>2) {setQuery(e)}else{setQuery("")}
    clearTimeout(timer)
    timer=setTimeout(getData,1000)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView>
      <TextInput
          style={styles.input}
          onChangeText={(e)=>{handleChange(e)}}
          placeholder='buscar...'
        />
        
        {items.length>0 ?
        <FlatList
          data={items}
          renderItem={({item})=><CardMenu item={item} agregar={agregar} eliminar={null}/>}
        />
        :
        <ThemedText>No se encuentran platos</ThemedText>
        }
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
  input:{
      width:400,
      backgroundColor:'#808080'

  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
