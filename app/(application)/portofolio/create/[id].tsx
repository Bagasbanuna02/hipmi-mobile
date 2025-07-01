import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PortofolioCreate() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Portofolio Create {id}</Text>
        </View> 
    );
}