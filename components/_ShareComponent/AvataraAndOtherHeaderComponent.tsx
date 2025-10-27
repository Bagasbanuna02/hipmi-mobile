import { AccentColor } from "@/constants/color-palet";
import Divider from "../Divider/Divider";
import Grid from "../Grid/GridCustom";
import AvatarComp from "../Image/AvatarComp";
import TextCustom from "../Text/TextCustom";

const AvatarUsernameAndOtherComponent = ({
  avatarHref,
  avatar,
  name,
  rightComponent,
  withBottomLine = false,
}: {
  avatarHref?: string;
  avatar?: string;
  name?: string;
  rightComponent?: React.ReactNode;
  withBottomLine?: boolean;
}) => {
  return (
    <>
      <Grid containerStyle={{ zIndex: 10 }}>
        <Grid.Col span={2}>
          <AvatarComp fileId={avatar} href={avatarHref as any} size="base" />
        </Grid.Col>
        <Grid.Col
          span={rightComponent ? 6 : 10}
          style={{ justifyContent: "center" }}
        >
          <TextCustom truncate bold>
            {name || "Username"}
          </TextCustom>
        </Grid.Col>
        {rightComponent && (
          <Grid.Col
            span={4}
            style={{ alignItems: "flex-end", justifyContent: "center" }}
          >
            {rightComponent}
          </Grid.Col>
        )}
      </Grid>
      {withBottomLine && <Divider color={AccentColor.blue} marginTop={0} />}
    </>
  );
};

export default AvatarUsernameAndOtherComponent;
