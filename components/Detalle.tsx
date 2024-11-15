import { StyleSheet, Image, Button,Pressable,View } from 'react-native';
import { useMenu } from '@/contexts/MenuContext';
import BotonesCard from './BotonesCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect ,useState} from 'react';
import { apiKey } from '@/constants/api';
import { FlatList } from 'react-native-gesture-handler';


export default function Detalle({setModal,eliminar,agregar,item}:{setModal:any,eliminar:any,agregar:any,item:any}) {
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
        return 
    }
  return (
   
      <ThemedView style={styles.modalView}>
        

        <Image style={styles.foto}  source={{ uri: detalles.image }}></Image>

        <ThemedText>{detalles.title}</ThemedText>

        {detalles.vegetarian && <ThemedText>-vegetariano</ThemedText>}
        {detalles.vegan && <ThemedText>-vegano</ThemedText>}
        {detalles.glutenFree && <ThemedText>-libre de gluten</ThemedText>}
        {detalles.diaryFree && <ThemedText>-libre de lactosa</ThemedText>}
        {detalles.cheap && <ThemedText>-barato</ThemedText>}

        <ThemedText>Puntaje de salud: {detalles.healthScore}</ThemedText>
        <br></br>
        <ThemedText>Ingredientes:</ThemedText>
        <FlatList
          data={detalles.extendedIngredients}
          renderItem={({item})=><ThemedText>-{item.nameClean}</ThemedText>}
        />

        <BotonesCard getDetalles={null} agregar={agregar} eliminar={eliminar} setModal={setModal} item={item}/>

        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModal(false)}>
        X </Pressable>
        </ThemedView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  botones:{
    display:'flex',
    flexDirection:'row'
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 20,
    padding: 6,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color:'White',
  },
  buttonClose: {
    backgroundColor: '#fafafa',
    color: '000',
    textAlign: 'center',
    alignItems: 'center',
    borderColor: '#141414',
    borderWidth: 1
  },
  modalView:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  foto:{
     height: 175,
        width: 280,
        borderRadius: 20
  }
});
