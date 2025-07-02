import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProfileEdit() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Profile Edit {id}</Text>
        </View>
    )
}