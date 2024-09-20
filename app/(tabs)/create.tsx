import { useState } from "react";
import { router } from "expo-router";
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
import { createRecipe, uploadRecipeImage } from "@/lib/recipe-service";
import { icons } from "@/constants/Icons";
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
    const { user } = useGlobalContext();

    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        creator: "",
        description: "",
        ingredients: "",
        mainPicture: "",
        mainPictureName: "",
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
            setForm({ ...form, mainPicture: result.assets[0].uri });
            console.log(result.assets[0].uri);
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
            const recipeId = await createRecipe(
                form.name,
                form.creator,
                form.description,
                form.ingredients,
                form.mainPictureName
            );
            
            if (recipeId)
            {
                const imageUploadResult = await uploadRecipeImage(form.creator, recipeId, form.mainPictureName, form.mainPicture);

                if (imageUploadResult) {

                    Alert.alert("Success", "Post uploaded successfully");
                    router.push("/home");
                }
                else {
                    Alert.alert("Error", "An error occured uploading recipe image");
                }
            }
            else {
                Alert.alert("Error", "An error occured uploading recipe. No string was returned");
            }
            
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                name: form.name,
                creator: "",
                description: "",
                ingredients: "",
                mainPicture: "",
                mainPictureName: "",
            });

            setUploading(false);
        }
    };

    if (uploading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Saving Recipe...</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView className="bg-primary h-full">
                <ScrollView className="px-4 my-6">
                    <Text className="text-2xl text-white font-psemibold">Create Recipe</Text>
    
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
                            {form.mainPicture ? (
                                <Image
                                    source={{ uri: form.mainPicture }}
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
                        title="Submit & Publish"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={uploading}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default Create;