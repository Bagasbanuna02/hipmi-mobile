import { FontAwesome5 } from "@expo/vector-icons";

export default function IconHistory({ color }: { color?: string }) {
  return (
    <>
      <FontAwesome5 size={20} name="history" color={color} />
    </>
  );
}
