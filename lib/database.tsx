import { RecipeModel } from "@/models/recipeModels";
import { createClient } from "@supabase/supabase-js";
import { Alert, AppState } from "react-native";

const supabaseUrl = "https://zsjywcypeffudolbyeoh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzanl3Y3lwZWZmdWRvbGJ5ZW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyODUwMzksImV4cCI6MjAzNDg2MTAzOX0.lefIo-ibHQyAviM31nf3qC6VlKhzd6Sju-Fb1GcMPH4";

export const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        client.auth.startAutoRefresh()
    } else {
        client.auth.stopAutoRefresh()
    }
})