/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  BaseBox,
  Divider,
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
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { router } from "expo-router";
import { useState } from "react";

export default function AdminForumReportPosting() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [id, setId] = useState<any>();

  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari"
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle
          title="Report Posting"
          rightComponent={rightComponent}
        />

        <BaseBox>
          <AdminTitleTable title1="Aksi" title2="Pelapor" title3="Postingan" />
          <Spacing />
          <Divider />
          {Array.from({ length: 10 }).map((_, index) => (
            <AdminTableValue
              key={index}
              value1={
                <ActionIcon
                  icon={
                    <IconView size={ICON_SIZE_BUTTON} color={MainColor.black} />
                  }
                  onPress={() => {
                    router.push(`/admin/forum/${id}/list-report-posting`);
                  }}
                />
              }
              value2={<TextCustom truncate={1}>Username username</TextCustom>}
              value3={
                <TextCustom truncate={2} align="center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Omnis laborum doloremque eius velit voluptate corrupti vel,
                  provident quaerat tempore animi sed accusamus amet.
                  Temporibus, praesentium? Rem voluptatum nesciunt voluptas
                  repellat.
                </TextCustom>
              }
            />
          ))}
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
