import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UpdatePhotoBackground() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Update Photo Background {id}</Text>
        </View>
    )
}