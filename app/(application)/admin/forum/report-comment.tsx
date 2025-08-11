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

export default function AdminForumReportComment() {

  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari Komentar"
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle
          title="Report Comment"
          rightComponent={rightComponent}
        />

        <BaseBox>
          <AdminTitleTable title1="Aksi" title2="Pelapor" title3="Jenis Laporan" />
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
                    router.push(`/admin/forum/${index + 1}/list-report-comment`);
                  }}
                />
              }
              value2={<TextCustom truncate={1}>Username username</TextCustom>}
              value3={
                <TextCustom truncate={2} align="center">
                 SPAM
                </TextCustom>
              }
            />
          ))}
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
