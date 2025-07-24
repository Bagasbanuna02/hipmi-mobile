import { ImageSourcePropType, View } from "react-native";
import Grid from "../Grid/GridCustom";
import AvatarCustom from "../Image/AvatarCustom";
import TextCustom from "../Text/TextCustom";
import Divider from "../Divider/Divider"

const AvatarUsernameAndOtherComponent = ({
  avatarHref,
  avatar,
  name,
  rightComponent,
  withBottomLine = false,
}: {
  avatarHref?: string;
  avatar?: ImageSourcePropType;
  name?: string;
  rightComponent?: React.ReactNode;
  withBottomLine?: boolean;
}) => {
  return (
    <>
        <Grid containerStyle={{ zIndex: 10 }}>
          <Grid.Col span={2}>
            <AvatarCustom source={avatar} href={avatarHref as any} />
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
        {withBottomLine && <Divider marginTop={0} />}
      <View>
      </View>
    </>
  );
};

export default AvatarUsernameAndOtherComponent;
