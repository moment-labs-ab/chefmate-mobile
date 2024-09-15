import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@/constants/Icons'

type TabIconType = {
    icon: Object,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = ({icon, color, name, focused} : TabIconType) => {
    return (
        <View className="items-center justify-center">
            <Image
               source={icon}
               resizeMode='contain'
               tintColor={color}
               className="w-6 h-6" 
            />
            
            {/*<Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>*/}
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 84
            }
        }}
    >
        <Tabs.Screen 
            name="create"
            options={{
                title: 'Create',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.create} 
                        color={color} 
                        name="Create" 
                        focused={focused} 
                    />
                )
            }}
        />

        <Tabs.Screen 
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.cutlery} 
                        color={color} 
                        name="Home" 
                        focused={focused} 
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.chefProfile} 
                        color={color} 
                        name="Profile" 
                        focused={focused} 
                    />
                )
            }}
        />
    </Tabs>
    </>
  )
}

export default TabsLayout