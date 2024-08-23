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
} from "react-native";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import { createRecipe, insertOrUpdateUser } from "@/lib/database";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    creator: "",
    pictures: [],
    ingredients: "",
    instructions: "",
    additionalTips: "",
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

  /*const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };*/

  const submit = async () => {
    form.creator = "f7557303-a8a1-4cdd-b31b-74848b45bead";
    
    if (
      (form.ingredients === "") ||
      (form.instructions === "") ||
      (form.additionalTips === "")
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
        await createRecipe(
            form.creator,
            form.pictures,
            form.ingredients,
            form.instructions,
            form.additionalTips
        );
        Alert.alert("Success", "Post uploaded successfully");
        router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        name: form.name,
        creator: "",
        pictures: [],
        ingredients: "",
        instructions: "",
        additionalTips: "",
      });

      setUploading(false);
    }
  };

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

        {/*<View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Recipe Image
          </Text>

          <TouchableOpacity>
            {form.pictures ? (
              <Image
                //source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  //source={icons.upload}
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
        </View>*/}

        <FormField
          title="Ingredients"
          value={form.ingredients}
          placeholder="The essential items of your recipe..."
          handleChangeText={(e) => setForm({ ...form, ingredients: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Instuctions"
          value={form.instructions}
          placeholder="How are people going to create this recipes..."
          handleChangeText={(e) => setForm({ ...form, instructions: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Additional Tips"
          value={form.additionalTips}
          placeholder="What else should people know..."
          handleChangeText={(e) => setForm({ ...form, additionalTips: e })}
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
};

export default Create;