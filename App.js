import React, { useEffect } from "react";
import Home from "./home";
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Details from "./details";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const registerPushNotifs = async () => {
    const statusResult = await Notifications.getPermissionsAsync();
    statusResult.status !== 'granted'
        ? await Notifications.requestPermissionsAsync()
        : statusResult;
    const tokenData = (await Notifications.getExpoPushTokenAsync()).data;
    fetch("https://trash-detect-backend-pratyush1712.vercel.app/register-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: tokenData
        })
    })
}

function HomeStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    useEffect(() => { registerPushNotifs() }, [])
    return <HomeStack />
}