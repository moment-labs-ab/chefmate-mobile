import { View, Text, Image, TouchableOpacity, TurboModuleRegistry } from 'react-native'
import { useState } from 'react'

type RecipeCardProps = {
    recipe: {
        name: string,
        description: string,
        thumbnail: string,
        creator: {
            username: string,
            avatar: string
        }
    }
}

const RecipeCard = ({ recipe: { name, description, thumbnail, creator: { username, avatar }} } : RecipeCardProps) => {
  
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={undefined}
                            className="w-full h-full rounded-lg"
                            resizeMode='cover'/>
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold" numberOfLines={1}>
                            {name}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image
                        source={undefined}
                        className="w-5 h-5"
                        resizeMode='contain'/>
                </View>
            </View>
            

        </View>
  )
}

export default RecipeCard