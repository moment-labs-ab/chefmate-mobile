import CustomButton from "@/components/CustomButtom";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";
import { images } from "@/constants/images";
import { useGlobalContext } from "@/context/Context";

export default function Welcome() {
    const {isLoading, isLoggedIn, user} = useGlobalContext();
    
    if(isLoggedIn){
        return (<Redirect href="/home"/>);
    } else {
        return (
            <SafeAreaView className="bg-primary h-full">

            <ScrollView
                contentContainerStyle={{
                height: "100%",
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4">
                <Image
                    source={images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode="contain"
                />

                <Image
                    //source={images.logo}
                    className="max-w-[380px] w-full h-[298px]"
                    resizeMode="contain"
                />

                <View className="relative mt-5">
                    <Text className="text-3xl text-white font-bold text-center">
                    Unlock your inner Chef with{" "}
                    <Text className="text-secondary-200">ChefMate!</Text>
                    </Text>

                    <Image
                    //source={images.path}
                    className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode="contain"
                    />
                </View>

                <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                    Some additional text here
                </Text>

                <CustomButton
                    title="Continue with Email"
                    handlePress={() => router.push("/sign-up")}
                    //handlePress={() => router.push("/sign-in")}
                    containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
            </SafeAreaView>
        );
    }   
}
