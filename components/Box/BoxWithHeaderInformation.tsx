import { Href } from "expo-router";
import BaseBox from "./BaseBox";

export default function BoxWithHeaderSection({
  children,
  href,
  onPress,
}: {
  children: React.ReactNode;
  href?: Href;
  onPress?: () => void;
}) {
  return (
    <>
      <BaseBox href={href} onPress={onPress} style={{ paddingTop: 5 }}>
        {children}
      </BaseBox>
    </>
  );
}
