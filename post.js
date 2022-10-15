import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "./globalStyles"

export default ({ location, time, img }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: img }} style={globalStyles.curvedImg} />
            <View style={globalStyles.smallPadView}>
                <Text style={globalStyles.subHeader}>Location: {location}</Text>
                <Text style={globalStyles.smallHeader}>Detected At: {time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        marginBottom: 20,
    }
})