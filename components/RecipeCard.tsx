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
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: "https://zsjywcypeffudolbyeoh.supabase.co/storage/v1/object/public/recipe-images/0eff318a-5331-47ed-8418-d04de931f5bc/ab85ff51-efe8-4884-9bf9-4f0bf64c22eb/1726795394769.jpg" }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={undefined} className="w-5 h-5 border border-secondary" resizeMode="contain" />
        </View>
      </View>
    </View>
  )
}

export default RecipeCard