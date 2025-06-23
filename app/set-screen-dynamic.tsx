import { styles } from "@/constants/styles";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: "Updated" });
        }}
      >
        Update the title
      </Text>
    </View>
  );
}

