import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '@/components/RecipeCard'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import CustomButton from '@/components/CustomButtom'
import useDatabase from '@/lib/useDatabase'
import { RecipeModel } from '@/models/recipeModels'
import { getRecipesByUser } from '@/lib/recipe-service'
import { useGlobalContext } from '@/context/Context'

const Home = () => {
    const { user, isLoading } = useGlobalContext();
    const [data, setData] = useState<RecipeModel | null>(null);

    useEffect(() => {
        const loadData = async () => {
            //const recipes = await getRecipesByUser("f7557303-a8a1-4cdd-b31b-74848b45bead");
            //setData(recipes);
        };

        loadData();
    }, [user?.userId]); 
    
    if(isLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }
    else {
        return ( 
            <SafeAreaView>
                <Text>{user?.email}</Text>
                <Text>{data?.additionalTips}</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
            </SafeAreaView>
            /*<SafeAreaView className="bg-primary h-full">
                <FlatList
                    data={null}
                    keyExtractor={(item) => item.$id}
                    renderItem={({item}) => (
                        <RecipeCard recipe={item}/>
                    )}
                    ListHeaderComponent={() => (
                        <View className="my-6 px-4 spacy-y-6">
                            <View className="justify-between items-start flex-row mb-6">
                                <View>
                                    <Text className="font-medium text-sm text-gray-100">
                                        Welcome Back
                                    </Text>
                                    <Text className="text-2xl font-psemibold text-white">
                                        Anshul
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
                                placeholder="Search for a video topic"
                                />

                            <View className="w-full flex-1 pt-5 pb-8">
                                <Text className="text-gray-100 text-lg font-pregular mb-3">
                                    Latest Videos
                                </Text>
                                <Trending/>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text>Empty State</Text>
                    )}
                    //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />

                <CustomButton
                            title="Test out DB" 
                            handlePress={testDB}
                            containerStyles="mt-7" 
                />

            </SafeAreaView>*/
        )
    }
}

export default Home