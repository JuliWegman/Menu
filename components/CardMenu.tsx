import { useNavigation, Link } from 'expo-router';
import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMenu } from '@/contexts/MenuContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export function CardMenu({ item, eliminar,agregar }: { item:any, eliminar: any ,agregar:any}) {
    const { setIdDetalles,listaIds } = useMenu();
    
    async function getDetalles(id: any) {
        setIdDetalles(-1);
        setIdDetalles(id);
    }
    
    return (
        <ThemedView style={styles.container}>
            <Image style={styles.foto} 
                source={{ uri: item.image }}
            />
            <ThemedText style={styles.titulo}>
                {item.title}
            </ThemedText>
            
            <ThemedView style={styles.containerBoton}>
                
                    <View style={styles.buttonContainer}>
                    <Link href="/(tabs)/detalles" asChild>
                        <Button 
                            title='Ver Detalles'
                            onPress={() => { getDetalles(item.id) }}
                            color="#FDC500"
                        />
                      </Link>

                    </View>
                    {eliminar!=null?
                <View style={styles.buttonContainer}>
                    <Button 
                        title='Eliminar'
                        onPress={()=>{eliminar(item.id)}}
                        color="#EF233C"
                    />
                </View>
                :listaIds.indexOf(item.id)==-1&&
                <View style={styles.buttonContainer}>
                    <Button 
                        title='Agregar'
                        onPress={()=>{agregar(item)}}
                        color="#B6D369"
                    />
                </View>
                    }
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
