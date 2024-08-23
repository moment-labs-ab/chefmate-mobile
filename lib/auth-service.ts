import { Alert } from "react-native";
import { client } from "./database";
import { User } from "@/models/user";

export async function signInUser(email: string, password: string) {
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        });

        console.log(data, error);
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}

export async function createUserWithEmail(email: string, password: string) {
    try {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
        });

        if (data.user) {
            await insertOrUpdateUser(data.user.id, email);
        }

        console.log(data, error);
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}

async function insertOrUpdateUser(
    userId: string, 
    email: string,
    username?: string, 
    firstName?: string, 
    lastName?: string) {
    try {
        const { data, error } = await client
            .from("user")
            .upsert({
                id: userId, 
                username: username,
                email: email,
                first_name: firstName,
                last_name: lastName
            });

        if(!error) {
            console.log("User inserted/updated successfully", data);
        }
        else {
            console.error("Error inserting/updating user", error);
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}

export async function getCurrentUser() {
    const { data, error } = await client.auth.getUser();
    
    if (error) {
        console.error("No user found", error);
    } 
    
    if (data && data.user?.id != undefined) {
        let user : User = {
            email: data.user?.email,
            username: '',
            userId: data.user?.id
        }
        console.log(user);
        return user;
    }

    return null;
}