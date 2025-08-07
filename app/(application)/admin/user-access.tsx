import {
    ButtonCustom,
    Divider,
    Grid,
    SearchInput,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function AdminUserAccess() {
  const rightComponent = () => {
    return (
      <>
        <SearchInput
          containerStyle={{ width: "100%", marginBottom: 0 }}
          placeholder="Cari User"
        />
      </>
    );
  };
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminComp_BoxTitle
            title="User Access"
            rightComponent={rightComponent()}
          />
        }
      >
        <Grid>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Aksi</TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Username</TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Nomor</TextCustom>
          </Grid.Col>
        </Grid>

        <Divider />

        <StackCustom>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid key={index}>
              <Grid.Col
                span={4}
                style={{
                  alignItems: "center",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <TextCustom bold>
                  <ButtonCustom
                    iconLeft={
                      <Ionicons
                        name={
                          index % 2 === 0
                            ? "checkmark-outline"
                            : "close-circle-outline"
                        }
                        size={ICON_SIZE_MEDIUM}
                        color="black"
                      />
                    }
                    onPress={() => {}}
                    backgroundColor={
                      index % 2 === 0 ? MainColor.green : MainColor.red
                    }
                  >
                    <TextCustom size={"small"} color={"black"}>
                      {index % 2 === 0 ? "Berikan Akses" : "Hapus Akses"}
                    </TextCustom>
                  </ButtonCustom>
                </TextCustom>
              </Grid.Col>
              <Grid.Col
                span={4}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <TextCustom bold truncate>
                  Useraname
                </TextCustom>
              </Grid.Col>
              <Grid.Col
                span={4}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <TextCustom bold truncate>
                  08123456789
                </TextCustom>
              </Grid.Col>
            </Grid>
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
