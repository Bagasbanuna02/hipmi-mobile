import {
  BoxWithHeaderSection,
  Spacing,
  StackCustom,
  TextCustom
} from "@/components";
import { View } from "react-native";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";

export function Voting_BoxDetailSection({
  headerAvatar,
}: {
  headerAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom>
          <Voting_ComponentDetailDataSection/>
          <Spacing/>

          <View>
            <TextCustom bold size="small">
              Pilihan :
            </TextCustom>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i}>
                <TextCustom>Nama Pilihan {i + 1}</TextCustom>
                <Spacing />
              </View>
            ))}
          </View>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
