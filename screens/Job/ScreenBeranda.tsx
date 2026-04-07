import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  FloatingButton,
  LoaderCustom,
  OS_Wrapper,
  SearchInput,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { apiJobGetAll } from "@/service/api-client/api-job";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Job_ScreenBeranda() {
  const [listData, setListData] = useState<any[]>([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData(search);
    }, [search])
  );

  const onLoadData = async (search: string) => {
    try {
      setIsLoadData(true);
      const response = await apiJobGetAll({ search, category: "beranda" });
      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    onLoadData(search);
  };

  return (
    <OS_Wrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/job/create")} />
      }
      headerComponent={
        <SearchInput placeholder="Cari pekerjaan" onChangeText={handleSearch} />
      }
    >
      {isLoadData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Belum ada lowongan</TextCustom>
      ) : (
        listData.map((item, index) => (
          <BoxWithHeaderSection
            key={index}
            onPress={() => router.push(`/job/${item.id}`)}
          >
            <StackCustom>
              <AvatarUsernameAndOtherComponent
                avatar={item?.Author?.Profile?.imageId}
                avatarHref={`/profile/${item?.Author?.Profile?.id}`}
                name={item?.Author?.username}
              />

              <TextCustom truncate={2} align="center" bold size="large">
                {item?.title || "-"}
              </TextCustom>
            </StackCustom>
            <Spacing />
          </BoxWithHeaderSection>
        ))
      )}
      <Spacing />
    </OS_Wrapper>
  );
}
