import { IconPublish, IconReject } from "@/components/_Icon/IconComponent";
import ButtonCustom from "@/components/Button/ButtonCustom";
import Grid from "@/components/Grid/GridCustom";
import { MainColor } from "@/constants/color-palet";

export default function AdminButtonReview({
  isLoading,
  onPublish,
  onReject,
}: {
  isLoading?: boolean;
  onPublish: () => void;
  onReject: () => void;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={6} style={{ paddingRight: 10 }}>
          <ButtonCustom
            isLoading={isLoading}
            iconLeft={<IconPublish />}
            backgroundColor={MainColor.green}
            textColor="white"
            onPress={onPublish}
          >
            Publish
          </ButtonCustom>
        </Grid.Col>
        <Grid.Col span={6} style={{ paddingLeft: 10 }}>
          <ButtonCustom
            iconLeft={<IconReject />}
            backgroundColor={MainColor.red}
            textColor="white"
            onPress={onReject}
          >
            Reject
          </ButtonCustom>
        </Grid.Col>
      </Grid>
    </>
  );
}
