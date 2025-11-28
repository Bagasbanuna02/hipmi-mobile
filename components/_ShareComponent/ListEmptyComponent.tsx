import { View } from "react-native";
import TextCustom from "../Text/TextCustom";

//  Komponen Empty
const ListEmptyComponent = ({ search }: { search?: string }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <TextCustom align="center" color="gray">
      {search ? "Tidak ada hasil pencarian" : "Tidak ada data"}
    </TextCustom>
  </View>
);

export default ListEmptyComponent;
