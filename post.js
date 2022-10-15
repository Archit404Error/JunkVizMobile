import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "./globalStyles"

export default ({ location, time, img, navigation }) => {
    const date = new Date(time)
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Details")} style={styles.container}>
            <Image source={{ uri: img }} style={globalStyles.curvedImg} />
            <View style={globalStyles.smallPadView}>
                <Text style={globalStyles.subHeader}>Location: {location}</Text>
                <Text style={globalStyles.smallHeader}>Date: {date.toDateString()}</Text>
                <Text style={globalStyles.smallHeader}>Time: {date.toTimeString()}</Text>
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