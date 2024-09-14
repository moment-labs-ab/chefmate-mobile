import { View, Text, ScrollView, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButtom";
import FormField from "@/components/FormField";
import { getCurrentUser, signInUser } from "@/lib/auth-service";
import { useGlobalContext } from "@/context/Context";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
    } else {
      setIsSubmitting(true);

      try {
        const authResult = await signInUser(form.email, form.password);

        if (authResult) {
          const result = await getCurrentUser();

          if (result) {
            setUser(result);
            setIsLoggedIn(true);

            //Alert.alert("Success", "Logged in successfully");

            router.replace("/home");
          } else {
            Alert.alert(
              "Error",
              "Something went wrong with session sign in. Check sign-in.tsx"
            );
          }
        }
        else{
            Alert.alert("Sign In Error", "Incorrect email or password");
        }

      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 min-h-[83vh]">
          <Image
            //source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold">
            Log in to ChefMate
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
