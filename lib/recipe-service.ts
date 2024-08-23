import { RecipeModel } from "@/models/recipeModels";
import { Alert } from "react-native";
import { client } from "./database";

export async function createRecipe(
    creator: string,
    pictures: string[],
    ingredients: string,
    instuctions: string,
    additionalTips: string
) {
    try {
        const num = Math.floor(Math.random() * 100000);
        
        const { data, error } = await client
            .from("recipe")
            .insert({ 
                id: num, 
                creator: creator,
                //pictures: pictures,
                ingredients: ingredients,
                instructions: instuctions,
                additionalTips: additionalTips 
            })
            .select();

        console.log(data);

    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
    }
}

export const getRecipesByUser = async (creator: string) : Promise<RecipeModel | null> => {
    try {
        const { data, error } = await client
            .from("recipe")
            .select("id, creator, ingredients, instructions, additionalTips");
            //.eq("recipe.creator", creator);
            
        console.log('Query Successful', data);
        console.log('Query Error', error);
        if (data) {
            return {
                creator: data[0].creator,
                ingredients: data[0].ingredients,
                instructions: data[0].instructions,
                additionalTips: data[0].additionalTips
            } as RecipeModel;
        }
        return null;
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");

        return null;
    }
}