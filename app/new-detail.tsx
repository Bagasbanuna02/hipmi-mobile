import { styles } from "@/constants/styles";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NewDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <Text onPress={() => router.setParams({ name: "Bagas" })}>
        Update title
      </Text>
      <Text onPress={() => router.back()}>Back</Text>
    </View>
  );
}
