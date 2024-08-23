import { GlobalProvider } from "@/context/Context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GlobalProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/*<Stack.Screen name="search/[query]" options={{ headerShown: false }} />*/}
        </Stack>    
    </GlobalProvider>
  );
}
