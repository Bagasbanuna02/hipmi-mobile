import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import HomeView from "@/screens/Home/HomeView";
import { Styles } from "@/styles/global-styles";
import { View } from "react-native";

export default function Application() {
  return (
    <>
      <ViewWrapper>
        <View style={Styles.container}>
          <HomeView />
        </View>
      </ViewWrapper>
    </>
  );
}
