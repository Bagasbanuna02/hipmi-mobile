import {
  ActionIcon,
  BaseBox,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Divider } from "react-native-paper";

export default function AdminCollaborationPublish() {
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Collaboration" />}>
        <StackCustom gap={"xs"}>
          <AdminComp_BoxTitle title="Publish" />
          <BaseBox>
            <AdminTitleTable
              title1="Aksi"
              title2="Username"
              title3="Judul Proyek"
            />
            <Spacing height={10} />
            <Divider />

            {Array.from({ length: 10 }).map((_, index) => (
              <AdminTableValue
                key={index}
                value1={
                  <ActionIcon
                    icon={
                      <Octicons
                        name="eye"
                        size={ICON_SIZE_BUTTON}
                        color="black"
                      />
                    }
                    onPress={() => {
                      router.push(`/admin/collaboration/${index}/publish`);
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>Username username </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis asperiores quidem deleniti architecto eaque et
                    nostrum, ad consequuntur eveniet quisquam quae voluptatum
                    ducimus! Dolorem nobis modi officia debitis, beatae
                    mollitia.
                  </TextCustom>
                }
              />
            ))}
          </BaseBox>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

