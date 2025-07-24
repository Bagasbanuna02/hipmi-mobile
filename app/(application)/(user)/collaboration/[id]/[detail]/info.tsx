/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarUsernameAndOtherComponent,
  BackButton,
  BoxWithHeaderSection,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { Stack, useLocalSearchParams } from "expo-router";

export default function CollaborationRoomInfo() {
  const { id, detail } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          title: `Info`,
          headerLeft: () => <BackButton />,
        }}
      />

      <ViewWrapper>
        <BoxWithHeaderSection>
          <StackCustom>
            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.title}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BoxWithHeaderSection>

        <BoxWithHeaderSection>
          {Array.from({ length: 10 }).map((_, index) => (
            <AvatarUsernameAndOtherComponent key={index} avatarHref={`/profile/${index}`} />
          ))}
        </BoxWithHeaderSection>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    title: "Judul Proyek",
    value: "Judul Proyek",
  },
  {
    title: "Industri",
    value: "Pilihan Industri",
  },
  {
    title: "Deskripsi",
    value: "Deskripsi Proyek",
  },
  {
    title: "Tujuan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Keuntungan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
