import { StyleSheet, Image, Button,Pressable,View, SectionList } from 'react-native';
import { useMenu } from '@/contexts/MenuContext';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect ,useState} from 'react';
import { apiKey } from '@/constants/api';
import { FlatList } from 'react-native-gesture-handler';

export default function BotonesCard({getDetalles,setModal,eliminar,agregar,item,setItemDetalle}:{getDetalles:any,setModal:any,eliminar:any,agregar:any,item:any,setItemDetalle:any}) {
    const { setListaIds,listaIds } = useMenu();
    
    return(
            <ThemedView style={styles.containerBoton}>
                {getDetalles!=null&&
                <View style={styles.buttonContainer}>
                    <Button 
                        title='Ver Detalles'
                        onPress={() => { getDetalles(item.id); setModal(true); setItemDetalle(item)}}
                        color="#E7BB41"
                    />

                </View>
                }
                {eliminar!=null?
            <View style={styles.buttonContainer}>
                <Button 
                    title='Eliminar'
                    onPress={()=>{
                        eliminar(item.id);
                        setListaIds(listaIds.filter((i:any)=>i!==item.id));
                         
                        setModal(false)
                    }}
                    color="#E3170A"
                />
            </View>
            :listaIds.indexOf(item.id)==-1&&
            <View style={styles.buttonContainer}>
                <Button 
                    title='Agregar'
                    onPress={()=>{agregar(item)}}
                    color="#44BBA4"
                />
            </View>
                }
        </ThemedView>

    )
}

const styles = StyleSheet.create({

    botones:{
      display:'flex',
      flexDirection:'row'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin:5,
    },
    container: {
        display: 'flex',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    titulo: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
        width: 280,
    },
    containerBoton: {
        backgroundColor:'',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        padding: '2%',
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
  });
  