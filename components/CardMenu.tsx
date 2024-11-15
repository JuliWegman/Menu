import { Button, Image, StyleSheet} from 'react-native';
import { useMenu } from '@/contexts/MenuContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BotonesCard from './BotonesCard';

export function CardMenu({ item, eliminar,agregar,setModal,setItemDetalle }: { item:any, eliminar: any ,agregar:any,setModal:any,setItemDetalle:any}) {
    const { setIdDetalles } = useMenu();

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
            <BotonesCard getDetalles={getDetalles} agregar={agregar} eliminar={eliminar} setModal={setModal} item={item} setItemDetalle={setItemDetalle}/>
            
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#f5f5f5',
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
        backgroundColor: '#F4F4F8',
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
