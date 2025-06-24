import { Text, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
