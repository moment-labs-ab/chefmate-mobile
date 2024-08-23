import { Recipe } from "@/models/recipeModels";
import { Alert } from "react-native";
import { client } from "./database";

export const createRecipe = async (name: string, creator: string, description: string, ingredients: string) => {
    try {
        const num = Math.floor(Math.random() * 100000);
        
        const { data, error } = await client
            .from("recipe")
            .insert({ 
                id: num, 
                creator: creator,
                name: name,
                description: description,
                ingredients: ingredients,
            })
            .select();
        
        if (error) {
            console.error(error);
            Alert.alert("Error", "Error inserting recipe. Please try again.");
        }

    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
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