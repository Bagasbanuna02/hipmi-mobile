import {
    BadgeCustom,
    BoxWithHeaderSection,
    Spacing,
    StackCustom,
    TextCustom,
} from "@/components";
import { GStyles } from "@/styles/global-styles";
import dayjs from "dayjs";
import { View } from "react-native";

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
          <TextCustom align="center" bold size="large">
            Title of Voting Here
          </TextCustom>
          <TextCustom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis corporis blanditiis est provident corrupti facilis iste
            cum voluptate. Natus eum aut quos consequatur doloribus fugiat sit
            ullam minima non enim?
          </TextCustom>
          <View>
            <TextCustom bold size="small" align="center">
              Batas Voting
            </TextCustom>
            <BadgeCustom
              style={[GStyles.alignSelfCenter, { width: "70%" }]}
              variant="light"
            >
              {dayjs().format("DD/MM/YYYY")} -{" "}
              {dayjs().add(1, "day").format("DD/MM/YYYY")}
            </BadgeCustom>
          </View>

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
