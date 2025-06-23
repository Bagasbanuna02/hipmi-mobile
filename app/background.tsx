import { Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Background() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Home",
    
    });
  }, [navigation]);

  return (
    <View>
      <Text>Background</Text>
    </View>
  );
}
