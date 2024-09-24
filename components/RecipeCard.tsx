import { View, Text, Image, TouchableOpacity, TurboModuleRegistry, Alert } from 'react-native'
import { icons } from '@/constants/Icons'
import { useState } from 'react'
import { deleteRecipe } from '@/lib/recipe-service'

type RecipeCardProps = {
    recipe: {
        recipeId: string,
        name: string,
        description: string,
        thumbnail: string,
        creator: {
            username: string,
            avatar: string
        }
    }
    currentUserId: string
}

const RecipeCard = ({ 
    recipe: { 
        recipeId,
        name, 
        description, 
        thumbnail, 
        creator: { 
            username, 
            avatar 
        }
    },
    currentUserId
} : RecipeCardProps) => {
    const sameUser = currentUserId === username;
    const [menuIsVisible, setMenuIsVisible] = useState(sameUser);

    const createThreeButtonAlert = () => {
        Alert.alert('Edit or Delete Recipe', undefined, [
          {
            text: 'Edit',
            onPress: async () => {},
          },
          {
            text: 'Delete', 
            onPress: async () => {
                await deleteRecipe(recipeId);
            },
            style: 'destructive'
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
    }

    return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            {thumbnail === '' ? (
                <Image
                    source={icons.noImage}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                />
            ) : (<Image
                source={{uri: thumbnail}}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />)}
            
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

        {menuIsVisible && <View className="pt-2" >
            <TouchableOpacity onPress={createThreeButtonAlert}>
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>          
        </View>}
      </View>
    </View>
  )
}

export default RecipeCard