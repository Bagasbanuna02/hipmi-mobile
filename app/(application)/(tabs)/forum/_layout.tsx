//app/(application)/(tabs)/forum/_layout.tsx
import { Stack } from "expo-router";

export default function ForumLayout() {
  return<>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false,  }} />
  </Stack>
  </>
}
