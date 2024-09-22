import { View, Text, FlatList, Image, RefreshControl, Alert, ListRenderItemInfo } from 'react-native'
import {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '@/components/RecipeCard'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import { Recipe } from '@/models/recipeModels'
import { getAllRecipes, getRecipesByUser } from '@/lib/recipe-service'
import { useGlobalContext } from '@/context/Context'
import handleAsyncDbFunction from '@/lib/database-service'
import { User } from '@/models/user'

const Home = () => {
    const { user, isLoading } = useGlobalContext();

    const [userData, setUserData] = useState<User | null>(null);
    const [data, setData] = useState<Recipe[] | null>(null);

    const { data: posts, refetch } = handleAsyncDbFunction(getAllRecipes);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    };

    useEffect(() => {
        const loadData = async () => {
            //const recipes = await getRecipesByUser(user?.userId!);
            const recipes = await getAllRecipes();
            setData(recipes);

            setUserData(user);
        };

        loadData();
    }, [user?.id]); 
    
    if(isLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }
    else {
        return ( 
            <SafeAreaView className="bg-primary h-full">
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }: ListRenderItemInfo<Recipe>) => (
                        <RecipeCard
                            recipe={
                                {   name: item.name, 
                                    creator: {
                                        username: 
                                        item.creator, 
                                        avatar: ''
                                    }, 
                                    description: item.description, 
                                    thumbnail: item.mainPictureUri || ''
                                }
                            }
                            />
                    )}
                    ListHeaderComponent={() => (
                        <View className="my-6 px-4 spacy-y-6">
                            <View className="justify-between items-start flex-row mb-6">
                                <View>
                                    <Text className="font-medium text-sm text-gray-100">
                                        Welcome Back
                                    </Text>
                                    <Text className="text-2xl font-psemibold text-white">
                                        {userData?.username}
                                    </Text>
                                </View>

                                <View className="mt-1.5">
                                    <Image
                                        //source={null}
                                        className="w-9 h-10"
                                        //resizeMethod='contain'
                                        />
                                </View>
                            </View>

                            <SearchInput
                                placeholder="Search for a recipe"
                                />

                            <View className="w-full flex-1 pt-5 pb-8">
                                <Text className="text-gray-100 text-lg font-pregular mb-3">
                                    Latest RecipeZ
                                </Text>
                                {/*<Trending/>*/}
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text>Empty State</Text>
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />
            </SafeAreaView>
        )
    }
}

export default Home
