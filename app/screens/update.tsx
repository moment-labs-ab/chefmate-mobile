import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import { useGlobalContext } from "@/context/Context";
import { updateRecipe } from "@/lib/recipe-service";
import { icons } from "@/constants/Icons";
import * as ImagePicker from 'expo-image-picker';
import { Recipe } from "@/models/recipeModels";

const Update = () => {
    const { user } = useGlobalContext();

    const { recipeData } = useLocalSearchParams();
    const recipe = JSON.parse(recipeData as string) as Recipe;

    const [uploading, setUploading] = useState(false);
    const [isNewPicture, setIsNewPicture] = useState(false);

    const [form, setForm] = useState({
        id: recipe.id ?? "",
        name: recipe.name ?? "",
        creator: recipe.creator ?? "",
        description: recipe.description ?? "",
        ingredients: recipe.ingredients ?? "",
        mainPictureUri: recipe.mainPictureUri ?? "",
        //instructions: "",
        //additionalTips: "",
        //category:""
        //difficulty: "",
        //prepTime: "",
        //cookTime: "",
        //totalTime: "",
        //servings: "",
        //calories: "",
        //fat: "",
        //saturatedFat: "",
        //cholesterol: "",
        //sodium: "",
        //origin: "",
        //optionalVideo
        //likes
        //comments
    });

    /*useEffect(() => {
        console.log(form);
    }, [recipe]); */

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, mainPictureUri: result.assets[0].uri });
            setIsNewPicture(true);
        }
    }
    
    const submit = async () => {
        form.creator = user?.id!;

        if (
            (form.name === "") ||
            (form.description === "") ||
            (form.ingredients === "")
        ) {
            return Alert.alert("Please provide all fields");
        }

        setUploading(true);
        try {
            let uri = '';
            if (isNewPicture) {
                uri = form.mainPictureUri;
            }
            
            const recipeId = await updateRecipe(
                form.id,
                form.creator,
                form.name,
                form.description,
                form.ingredients,
                uri,
                isNewPicture
            );

            if (recipeId) {

                Alert.alert("Success", "Post updated successfully");
                
                if (router.canGoBack()) {
                    router.back();
                }
            }
            else {
                Alert.alert("Error", "An error occured updating recipe image");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                id: "",
                name: "",
                creator: "",
                description: "",
                ingredients: "",
                mainPictureUri: "",
            });

            setUploading(false);
        }
    };

    const cancel = () => {
        if (router.canGoBack()) {
            router.back();
        }
    }

    if (uploading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Updating Recipe...</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView className="bg-primary h-full">
                <ScrollView className="px-4 my-6">
                    <Text className="text-2xl text-white font-psemibold">Update Recipe</Text>
                    
                    <FormField
                        title="Recipe Name"
                        value={form.name}
                        placeholder="Give your recipe a name..."
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        otherStyles="mt-10"
                    />
    
                    <View className="mt-7 space-y-2">
                        <Text className="text-base text-gray-100 font-pmedium">
                            Recipe Image
                        </Text>
    
                        <TouchableOpacity
                            onPress={() => pickImage()}>
                            {form.mainPictureUri ? (
                                <Image
                                    source={{ uri: form.mainPictureUri }}
                                    resizeMode="cover"
                                    className="w-full h-64 rounded-2xl"
                                />
                            ) : (
                                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-5 h-5"
                                    />
                                    <Text className="text-sm text-gray-100 font-pmedium">
                                        Choose an Image
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
    
                    <FormField
                        title="Description"
                        value={form.description}
                        placeholder="A quick synapses"
                        handleChangeText={(e) => setForm({ ...form, description: e })}
                        otherStyles="mt-7"
                    />
    
                    <FormField
                        title="Ingredients"
                        value={form.ingredients}
                        placeholder="The essentials of your recipe"
                        handleChangeText={(e) => setForm({ ...form, ingredients: e })}
                        otherStyles="mt-7"
                    />
    
                    <CustomButton
                        title="Update Recipe"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={uploading}
                    />
                    <CustomButton
                        title="Cancel"
                        handlePress={cancel}
                        containerStyles="mt-7"
                        isLoading={false}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default Update;