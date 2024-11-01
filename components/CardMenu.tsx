import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import {Button,Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function CardMenu({  title , img , getDetalles , eliminar}: { title: string , img:string , getDetalles:any , eliminar:any }) {
    console.log(img);
    
  return (
    <ThemedView style={styles.container}>
        <ThemedText style={styles.titulo}>
           {title}
        </ThemedText>
        <Image style={styles.foto} 
            source={{uri:img}}
        />
        <Button 
            title='Eliminar'
            onPress={eliminar}
        />
        
        <Button
            title= 'verDetalle'
            onPress={getDetalles}
        />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  titulo: {
    
  },
  foto: {
    height:150,
    width:200
  },
  eliminar: {

  },
  verDetalle: {

  },
});
