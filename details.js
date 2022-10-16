import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default ({ route }) => {
    let millis = 0
    let seconds = 0
    let minutes = 0

    const [status, setStatus] = useState(route.params.status);
    const [timeText, setTimeText] = useState("");
    const [intClean, setIntClean] = useState(null);

    const handlePress = () => {
        if (status === "litter") {
            setStatus("getting picked");
        } else {
            setStatus("picked up");
        }
    };
    useEffect(() => {
        if (status === "getting picked") {
            setIntClean(setInterval(() => {
                millis += 10;
                if (millis >= 1000) {
                    millis = 0;
                    seconds += 1;
                }
                if (seconds >= 60) {
                    seconds = 0;
                    minutes += 1;
                }
                setTimeText(`${minutes}:${seconds}.${millis} spent cleaning`);
            }, 10));
        } else if (status === "picked up") {
            clearInterval(intClean);
            setTimeText(`✅ Finished, ` + timeText);
        }

        fetch('https://trash-detect-backend-pratyush1712.vercel.app/update-point', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: route.params.id,
                status: status,
            }),
        });
    }, [status]);
    return (
        <>
            <Image source={{ uri: route.params.image }} style={{ height: 300, width: null }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20 }}>Head to {route.params.location} and get ready to start cleaning!</Text>
                <TouchableOpacity style={styles.container} onPress={handlePress}>
                    {status === "litter" &&
                        <Text style={styles.litter}>Start Cleaning</Text>
                    }
                    {status === "getting picked" &&
                        <Text style={styles.picking}>Picked Up?</Text>
                    }
                    {status === "picked up" &&
                        <Text style={styles.cleaned}>Cleanup Recorded!</Text>
                    }
                </TouchableOpacity>
                <Text style={{ marginTop: 20, fontSize: 20, color: "black" }}>{timeText}</Text>
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