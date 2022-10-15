import {View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useEffect, useState} from 'react';

export default ({route}) => {
    const [status, setStatus] = useState(route.params.status);
    const handlePress = () => {
        if (status === "litter") {
            setStatus("getting picked");
        } else {
            setStatus("picked up");
        }
    };
    useEffect(() => {
        fetch('https://trash-detect-backend-pratyush1712.vercel.app/update-point', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: route.params.id,
                status: status,
            }),
        });
    }, [status]);
    return (
        <>
            <Image source={{uri: route.params.image}} style={{height: 300, width: null}} />
            <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>Head to {route.params.location} and get ready to start cleaning!</Text>
                <TouchableOpacity style={styles.container} onPress={handlePress}>
                    {status === "litter" && (
                        <Text style={styles.litter}>Start Cleaning</Text>
                    )}
                    {status === "getting picked" && (
                        <Text style={styles.picking}>Picked Up?</Text>
                    )}
                    {status === "picked up" && (
                        <Text style={styles.cleaned}>Yayy!!</Text>
                    )}
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        backgroundColor: "yellow",
        borderRadius: 10,
        borderColor: "yellow",
        alignItems: "center"
    },
    litter: {
        color: "Red"
    }, picking: {
        color: "Yellow"
    }, cleaned: {
        color: "Green"
    },
});