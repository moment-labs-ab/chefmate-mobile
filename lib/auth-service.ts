import { Alert } from "react-native";
import { client } from "./database";
import { User } from "@/models/user";

export async function signInUser(email: string, password: string): Promise<boolean> {
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            return false
        }
        
        if (data.user) {
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
        return false;
    }
}

export async function signOutUser() {
    try {
        const { error } = await client.auth.signOut();

        if (error) {
            console.error("Error signing out", error);
        }
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

        console.log(dbUser);
        return dbUser;
    }

    return null;
}

export const getDatabaseUser = async (currentUser: string) : Promise<User | null> => {
    try {
        const { data, error } = await client
            .from("user")
            .select()
            .eq("id", currentUser)
        

            if (error) {
                console.error(`Error retrieving user: ${currentUser}`, error);
            }
            
            if (data) {
                // Data from supabase comes back as a list of objectl
                let recipe: User = {
                    id: data[0].id,
                    username: data[0].username,
                    firstName: data[0].first_name,
                    lastName: data[0].last_name,
                    email: data[0].email,
                    timeCreated: data[0].time_created,
                    timeUpdated: data[0].time_updated,
                    avatar: data[0].avatar
                };
    
                return recipe;
            }
    
            // Do something else for when no recipes for current user
            throw new Error("No data found");
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");

        return null;
    }
}