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

export async function createUserWithEmail(username: string, email: string, password: string) {
    try {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
        });

        if (data.user) {
            await createUser(data.user.id, email, username);
        }

        console.log(data, error);
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}

async function createUser(
    userId: string, 
    email: string,
    username: string) {
    try {
        const { data, error } = await client
            .from("user")
            .insert({
                id: userId, 
                username: username,
                email: email,
            });

        if(!error) {
            console.log("User inserted/updated successfully", data);

            let user = await getDatabaseUser(userId);
            return user;
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
        let dbUser = await getDatabaseUser(data.user.id);
        
        let user : User = {
            email: data.user?.email,
            username: "dbUser.username",
            userId: data.user?.id
        }
        console.log(user);
        return user;
    }

    return null;
}

export async function getDatabaseUser(userId: string) {
    try {
        const { data, error } = await client
            .from("user")
            .select();

        if(!error) {
            console.log(`User ${userId} retreived successfully`, data);
            return data;
        }
        else {
            console.error(`Error retreiving user: ${userId}`, error);
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}