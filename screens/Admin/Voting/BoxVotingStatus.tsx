import { Divider, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { dateTimeView } from "@/utils/dateTimeView";
import { router } from "expo-router";
import { View } from "react-native";

interface BoxVotingStatusProps {
  item: any;
  status?: string;
  path: any;
}

export default function Admin_BoxVotingStatus({
  item,
  status,
  path,
}: BoxVotingStatusProps) {
  return (
    <>
      <AdminBasicBox
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        onPress={() => {
          router.push(path);
        }}
      >
        <StackCustom gap={0}>
          <View style={{ paddingBlock: 8 }}>
            <TextCustom size={"large"} bold truncate={2}>
              {item?.title || "-"}
            </TextCustom>
          </View>
          <Divider />
          <GridSpan_4_8
            label={<TextCustom>Mulai</TextCustom>}
            value={
              <TextCustom>
                {dateTimeView({ date: item?.awalVote }) || "-"}
              </TextCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Berakhir</TextCustom>}
            value={
              <TextCustom>
                {dateTimeView({ date: item?.akhirVote }) || "-"}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
    </>
  );
}
