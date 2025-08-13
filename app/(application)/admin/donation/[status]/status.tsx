import {
    ActionIcon,
    SearchInput,
    Spacing,
    TextCustom,
    ViewWrapper
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { Divider } from "react-native-paper";

export default function AdminDonationStatus() {
  const { status } = useLocalSearchParams();
  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari"
    />
  );
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminComp_BoxTitle
            title={`Donasi ${_.startCase(status as string)}`}
            rightComponent={rightComponent}
          />
        }
      >
        <AdminTitleTable
          title1="Aksi"
          title2="Username"
          title3="Judul Donasi"
        />
        <Spacing />
        <Divider />

        {Array.from({ length: 10 }).map((_, index) => (
          <AdminTableValue
            key={index}
            value1={
              <ActionIcon
                icon={
                  <Octicons name="eye" size={ICON_SIZE_BUTTON} color="black" />
                }
                onPress={() => {
                  router.push(`/admin/donation/${index}/${status}`);
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
      </ViewWrapper>
    </>
  );
}
