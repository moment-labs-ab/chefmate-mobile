import { View, Text, ScrollView, AppState } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButtom'
import { createUserWithEmail } from '@/lib/auth-service'

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if(form.email === '' || form.password === '')
        {
            Alert.alert('Error', 'Please fill all fields');
        }

        setIsSubmitting(true);

        try {
            const result = await createUserWithEmail(form.username, form.email, form.password);

            router.replace('/home')
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center px-4 my-6 min-h-[83vh]">
                    <Image 
                        //source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[35px]"
                    />
                    <Text
                        className="text-2xl text-white text-semibold"
                    >   
                        Sign up to ChefMate
                    </Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign Up" 
                        handlePress={submit}
                        containerStyles="mt-7" 
                        isLoading={isSubmitting} 
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Already have an account?
                        </Text>
                        <Link 
                            className='text-lg text-secondary font-psemibold'
                            href="/sign-in"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default SignUp