import { StackCustom, TextCustom, ViewWrapper } from "@/components";

export default function NotFoundScreen() {
    return (
      <ViewWrapper>
        <StackCustom align="center" gap={0} style={{justifyContent: "center", alignItems: "center", flex: 1}}>
          <TextCustom size="large" bold style={{fontSize: 100}}>
            404
          </TextCustom>
          <TextCustom size="large" bold>
            Sorry, File Not Found
          </TextCustom>
        </StackCustom>
      </ViewWrapper>
    );
}