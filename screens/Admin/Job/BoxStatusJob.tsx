import { Spacing, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { router } from "expo-router";
import { View } from "react-native";
import { Divider } from "react-native-paper";

interface BoxStatusJobProps {
  item: any;
  status: string;
}

export function BoxStatusJob({ item, status }: BoxStatusJobProps) {
  return (
    <AdminBasicBox
      style={{ marginHorizontal: 10, marginVertical: 5 }}
      onPress={() => {
        router.push(`/admin/job/${item.id}/${status}`);
      }}
    >
      <StackCustom>
       <View style={{paddingBlock: 8}}>
         <TextCustom size={"large"} align="center" bold truncate={2}>
          {item?.title || "-"}
        </TextCustom>
       </View>
      </StackCustom>
    </AdminBasicBox>
  );
}