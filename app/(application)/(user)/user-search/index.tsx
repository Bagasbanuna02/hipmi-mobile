import {
  AvatarComp,
  ClickableCustom,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { apiAllUser } from "@/service/api-client/api-user";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function UserSearch() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    onLoadData(search);
  }, [search]);

  const onLoadData = async (search: string) => {
    try {
      const response = await apiAllUser({ search: search });
      console.log("[DATA USER] >", JSON.stringify(response.data, null, 2));
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    onLoadData(search);
  };

  return (
    <>
      <ViewWrapper
        headerComponent={
          <TextInputCustom
            value={search}
            onChangeText={handleSearch}
            iconLeft={
              <Ionicons
                name="search"
                size={ICON_SIZE_SMALL}
                color={MainColor.placeholder}
              />
            }
            placeholder="Cari Pengguna"
            borderRadius={50}
            containerStyle={{ marginBottom: 0 }}
          />
        }
      >
        <StackCustom>
          {!_.isEmpty(data) ? (
            data?.map((e, index) => {
              return (
                <ClickableCustom
                  key={index}
                  onPress={() => {
                    console.log("Ke Profile");
                    router.push(`/profile/${e?.Profile?.id}`);
                  }}
                >
                  <Grid>
                    <Grid.Col span={2}>
                      <AvatarComp fileId={e?.Profile?.imageId} size="base" />
                    </Grid.Col>
                    <Grid.Col span={9}>
                      <StackCustom gap={"sm"}>
                        <TextCustom size="large">{e?.username}</TextCustom>
                        <TextCustom size="small">+{e?.nomor}</TextCustom>
                      </StackCustom>
                    </Grid.Col>
                    <Grid.Col
                      span={1}
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={ICON_SIZE_SMALL}
                        color={MainColor.white}
                      />
                    </Grid.Col>
                  </Grid>
                </ClickableCustom>
              );
            })
          ) : (
            <TextCustom align="center">Tidak ditemukan</TextCustom>
          )}
        </StackCustom>
        <Spacing height={50} />
      </ViewWrapper>
    </>
  );
}
