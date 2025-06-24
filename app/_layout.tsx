import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(application)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(application)/home/index" options={{ title: "Home" }} />
      <Stack.Screen name="(application)/(katalog)/index" options={{ title: "Katalog" }} /> */}
      
    </Stack>  
  );
}
