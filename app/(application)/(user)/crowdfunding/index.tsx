import {
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function Crowdfunding() {
  const listPage = [
    {
      title: "Investasi",
      desc: "Buat investasi dan jual beli saham lebih mudah dengan pengguna lain.",
      path: "investment/create",
    },
    {
      title: "Donasi",
      desc: "Berbagi info untuk berdonasi lebih luas dan lebih efisien.",
      path: "donation/create",
    },
  ];

  return (
    <ViewWrapper>
      <StackCustom>
        <Image
          source={require("@/assets/images/constants/crowd-hipmi.png")}
          contentFit="cover"
          transition={1000}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
          }}
        />

        {listPage.map((item, index) => (
          <BaseBox key={index} paddingTop={10} paddingBottom={10} href={item.path as any} marginBottom={0}>
            <Grid>
              <Grid.Col span={10}>
               <StackCustom gap={"xs"}>
               <TextCustom bold size="large">
                  {item.title}
                </TextCustom>
                <TextCustom>{item.desc}</TextCustom>
               </StackCustom>
              </Grid.Col>
              <Grid.Col
                span={2}
                style={{ alignItems: "flex-end", justifyContent: "center" }}
              >
                <Feather
                  name="chevron-right"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))}
      </StackCustom>
    </ViewWrapper>
  );
}
