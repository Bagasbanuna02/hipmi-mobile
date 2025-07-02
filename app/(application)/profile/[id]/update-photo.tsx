import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UpdatePhotoProfile() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Update Photo Profile {id}</Text>
    </View>
  );
}
