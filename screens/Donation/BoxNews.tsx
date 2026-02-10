import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import { formatChatTime } from "@/utils/formatChatTime";

export default function Donation_BoxNews({item}: {item: any}){
    return <>
     <BaseBox href={`/donation/[id]/(news)/${item?.id}`}>
      <Grid>
        <Grid.Col span={8}>
          <TextCustom truncate bold>
            {item?.title || "-"}
          </TextCustom>
        </Grid.Col>
        <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
          <TextCustom size="small">
            {formatChatTime(item?.createdAt)}
          </TextCustom>
        </Grid.Col>
      </Grid>
    </BaseBox>
    </>
}