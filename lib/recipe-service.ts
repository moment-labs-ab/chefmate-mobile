import { Recipe } from "@/models/recipeModels";
import { Alert } from "react-native";
import { client } from "./database";
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system';
import { icons } from "@/constants/Icons";

// Will need to update this with configuration.
const imageUriBase = "https://zsjywcypeffudolbyeoh.supabase.co/storage/v1/object/public/recipe-images/"

export const createRecipe = async (
    creatorId: string,
    name: string, 
    description: string, 
    ingredients: string,
    mainPictreUri: string
    ): Promise<string | null> => {

    const pictureId = Date.now().toString();
    
    try {
        const { data, error } = await client
            .from("recipe")
            .insert({ 
                name: name,
                description: description,
                ingredients: ingredients,
                image_uri: pictureId,
                image_id: pictureId,
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

        let imageUploadResult = await uploadRecipeImage(creatorId, data[0].id, mainPictreUri, pictureId);

        if (!imageUploadResult) {
            Alert.alert("Error", "An error occurred uploading recipe image");
            return null;
        }

        return data[0].id;
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
        return null;
    }
}

export const uploadRecipeImage = async (userId: string, recipeId: string, imageUri: string, pictureId: string) : Promise<boolean> => {
    const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const ext = imageUri.substring(imageUri.lastIndexOf('.') + 1);

    const { data, error } = await client.storage
        .from('recipe-images')
        .upload(`${userId}/${recipeId}/${pictureId}.${ext}`, decode(base64Data), {
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
            let creator = data[0].creator;
            let recipeId = data[0].id;
            let imageId = data[0].image_id;

            let recipe: Recipe = {
                id: recipeId,
                creator: creator,
                name: data[0].name,
                description: data[0].description,
                ingredients: data[0].ingredients,
                mainPictureUri: `${imageUriBase}/${creator}/${recipeId}/${imageId}`
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
        console.log("Getting all recipes");
        const { data, error } = await client
            .from("recipe")
            .select()
            .limit(10);

        if (error) {
            console.error("Error retrieving all recipes recipes: ", error);
        }
        
        if (data) {
            
            let recipes: Recipe[] = [];
            console.log("Retrieved recipes: ", data.length);
            for (let i = 0; i < data.length; i++) {
                let creator = data[i].creator;
                let recipeId = data[i].id;
                let imageId = data[i].image_id;

                let mainPictreUri = '';
                
                if (imageId === ''){
                    mainPictreUri = ''
                }
                else {
                    mainPictreUri = `${imageUriBase}/${creator}/${recipeId}/${imageId}.jpg`;
                }
                let recipe: Recipe = {
                    id: recipeId,
                    creator: creator,
                    name: data[i].name,
                    description: data[i].description,
                    ingredients: data[i].ingredients,
                    mainPictureUri: mainPictreUri
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