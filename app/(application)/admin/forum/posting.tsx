import {
  ActionIcon,
  BaseBox,
  SearchInput,
  Spacing,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { router } from "expo-router";
import React from "react";
import { Divider } from "react-native-paper";

export default function AdminForumPosting() {
  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari"
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle title={"Posting"} rightComponent={rightComponent} />
        <BaseBox>
          <AdminTitleTable title1="Aksi" title2="Username" title3="Postingan" />
          <Spacing />
          <Divider />
          {Array.from({ length: 10 }).map((_, index) => (
            <AdminTableValue
              key={index}
              value1={
                <ActionIcon
                  icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                  onPress={() => {
                    router.push(`/admin/forum/${index + 1}`);
                  }}
                />
              }
              value2={<TextCustom truncate={1}>Username username</TextCustom>}
              value3={
                <TextCustom truncate={2}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis asperiores quidem deleniti architecto eaque et
                  nostrum, ad consequuntur eveniet quisquam quae voluptatum
                  ducimus! Dolorem nobis modi officia debitis, beatae mollitia.
                </TextCustom>
              }
            />
          ))}
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
