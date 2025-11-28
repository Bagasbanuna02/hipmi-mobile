import { View } from "react-native";
import StackCustom from "../Stack/StackCustom";
import SkeletonCustom from "./SkeletonCustom";

const ListSkeletonComponent = ({
  length = 5,
  height = 100,
}: {
  length?: number;
  height?: number;
}) => (
  <View style={{ flex: 1 }}>
    <StackCustom>
      {Array.from({ length }).map((_, i) => (
        <SkeletonCustom height={height} key={i} />
      ))}
    </StackCustom>
  </View>
);

export default ListSkeletonComponent;
