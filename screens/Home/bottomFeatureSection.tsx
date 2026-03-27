import { CenterCustom, ClickableCustom, TextCustom } from "@/components";
import Spacing from "@/components/_ShareComponent/Spacing";
import { router } from "expo-router";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesHome } from "./homeViewStyle";
import _ from "lodash";

export default function Home_BottomFeatureSection({
  listData,
}: {
  listData: any[] | null;
}) {
  console.log("listData", JSON.stringify(listData, null, 2));
  return (
    <>
      <ClickableCustom onPress={() => router.push("/job")}>
        <View style={stylesHome.jobVacancyContainer}>
          <View style={stylesHome.jobVacancyHeader}>
            <Icon name="briefcase" size={24} color="white" />
            <Spacing width={10} />
            <TextCustom bold size="large">
              Job Vacancy
            </TextCustom>
          </View>

          <View style={stylesHome.vacancyList}>
            {/* Vacancy Item 1 */}
            {_.isEmpty(listData) ? (
              <CenterCustom style={{ paddingBlock: 50 }}>
                <TextCustom>Lowongan pekerjaan belum tersedia</TextCustom>
              </CenterCustom>
            ) : (
              listData?.map((item: any, index: number) => (
                <View style={stylesHome.vacancyItem} key={index}>
                  <View style={stylesHome.vacancyDetails}>
                    <TextCustom bold color="yellow" truncate size="large">
                      {item.title}
                    </TextCustom>
                    <Spacing height={5} />
                    <TextCustom truncate={2}>{item.deskripsi}</TextCustom>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ClickableCustom>
    </>
  );
}
