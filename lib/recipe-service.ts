import { Recipe } from "@/models/recipeModels";
import { Alert } from "react-native";
import { client } from "./database";
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system';

export const createRecipe = async (
    name: string, 
    description: string, 
    ingredients: string,
    imageFileName: string
    ): Promise<string | null> => {

    try {
        const { data, error } = await client
            .from("recipe")
            .insert({ 
                name: name,
                description: description,
                ingredients: ingredients,
                image_uri: imageFileName
            })
            .select();
        
        if (error) {
            console.error(error);
            Alert.alert("Error", "Error inserting recipe. Please try again.");
            return null;
        }

        if (!data) {
            console.error("No data returned from insert");
            return null;
        }

        return data[0].id;
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
        return null;
    }
}

export const uploadRecipeImage = async (userId: string, recipeId: string, imageUri: string) : Promise<boolean> => {
    const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const ext = imageUri.substring(imageUri.lastIndexOf('.') + 1);

    const { data, error } = await client.storage
        .from('recipe-images')
        .upload(`${userId}/${recipeId}/${Date.now()}.${ext}`, decode(base64Data), {
            contentType: `image/${ext}`,
        });
        
    if (error) {
        console.error("Upload Image error: ", error);
        return false;
    } else {
        console.log(data);
        return true;
    }
}

export const getRecipesByUser = async (creator: string) : Promise<Recipe | null> => {
    try {
        const { data, error } = await client
            .from("recipe")
            .select()
            .eq("creator", creator);

        if (error) {
            console.error("Error retrieving recipes: ", error);
        }
        
        if (data) {
            // Data from supabase comes back as a list of objectl
            let recipe: Recipe = {
                id: data[0].id,
                creator: data[0].creator,
                name: data[0].name,
                description: data[0].description,
                ingredients: data[0].ingredients
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

export const getAllRecipes = async () : Promise<Recipe[] | null> => {
    try {
        const { data, error } = await client
            .from("recipe")
            .select()
            .limit(10);

        if (error) {
            console.error("Error retrieving all recipes recipes: ", error);
        }
        
        if (data) {
            
            let recipes: Recipe[] = [];
            for (let i = 0; i < data.length; i++) {
                let recipe: Recipe = {
                    id: data[i].id,
                    creator: data[i].creator,
                    name: data[i].name,
                    description: data[i].description,
                    ingredients: data[i].ingredients
                };
                recipes.push(recipe);
            }
            
            return recipes;
        }

        // Do something else for when no recipes for current user
        throw new Error("No data found");
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");

        return null;
    }
}