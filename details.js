import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default ({ route }) => {
    return (
        <>
            <Image source={{ uri: route.params.image }} style={{ height: 300, width: null }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20 }}>Head to {route.params.location} and get ready to start cleaning!</Text>
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.tintText}>Start Cleaning</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        backgroundColor: "yellow",
        borderRadius: 10,
        borderColor: "yellow",
        alignItems: "center"
    },
    tintText: {
        color: "black"
    },
})