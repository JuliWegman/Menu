import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { useNavigation, Link } from 'expo-router';
import { apiKey } from '@/constants/api';
import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMenu } from '@/contexts/MenuContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import axios from 'axios';

export function CardMenu({ id, title, img, eliminar }: { id: any, title: string, img: string, eliminar: any }) {
    const { setIdDetalles ,idDetalles} = useMenu();
    
    async function getDetalles(id: any) {
        setIdDetalles(-1);
        setIdDetalles(id);
        
        
        
    }
    
    return (
        <ThemedView style={styles.container}>
            <Image style={styles.foto} 
                source={{ uri: img }}
            />
            <ThemedText style={styles.titulo}>
                {title}
            </ThemedText>
            
            <ThemedView style={styles.containerBoton}>
                
                    <View style={styles.buttonContainer}>
                    <Link href="/(tabs)/detalles" asChild>
                        <Button 
                            title='Ver Detalles'
                            onPress={() => { getDetalles(id) }}
                            color="#FDC500"
                        />
                      </Link>

                    </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title='Eliminar'
                        onPress={eliminar}
                        color="#EF233C"
                    />
                </View>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
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
    foto: {
        height: 175,
        width: 280,
        borderRadius: 20,
        
        marginTop: 10,
    },
    containerBoton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});
