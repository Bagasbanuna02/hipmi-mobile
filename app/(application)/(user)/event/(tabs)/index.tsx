import {
  AvatarCustom,
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import FloatingButton from "@/components/Button/FloatingButton";
import { router } from "expo-router";

export default function Event() {
  const index = "test-id-event";
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    >
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index}>
          <StackCustom gap={"xs"}>
            <Grid>
              <Grid.Col span={2}>
                <AvatarCustom href={`/profile/${index}`} />
              </Grid.Col>
              <Grid.Col span={10} style={{ justifyContent: "center" }}>
                <TextCustom bold>Username</TextCustom>
              </Grid.Col>
            </Grid>
            <TextCustom truncate bold>
              Lorem ipsum dolor sit
            </TextCustom>
            <TextCustom truncate={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
              doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
              obcaecati quia suscipit numquam, voluptates commodi porro impedit
              natus quos doloremque!
            </TextCustom>
          </StackCustom>
        </BaseBox>
      ))} */}
      <BaseBox>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${index}`} />
            </Grid.Col>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom bold>Username</TextCustom>
            </Grid.Col>
          </Grid>
          <TextCustom truncate bold>
            Lorem ipsum dolor sit
          </TextCustom>
          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
            doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
            obcaecati quia suscipit numquam, voluptates commodi porro impedit
            natus quos doloremque!
          </TextCustom>
        </StackCustom>
      </BaseBox>
      <BaseBox>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${index}`} />
            </Grid.Col>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom bold>Username</TextCustom>
            </Grid.Col>
          </Grid>
          <TextCustom truncate bold>
            Lorem ipsum dolor sit
          </TextCustom>
          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
            doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
            obcaecati quia suscipit numquam, voluptates commodi porro impedit
            natus quos doloremque!
          </TextCustom>
        </StackCustom>
      </BaseBox>
      <BaseBox>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${index}`} />
            </Grid.Col>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom bold>Username</TextCustom>
            </Grid.Col>
          </Grid>
          <TextCustom truncate bold>
            Lorem ipsum dolor sit
          </TextCustom>
          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
            doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
            obcaecati quia suscipit numquam, voluptates commodi porro impedit
            natus quos doloremque!
          </TextCustom>
        </StackCustom>
      </BaseBox>
      <BaseBox>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${index}`} />
            </Grid.Col>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom bold>Username</TextCustom>
            </Grid.Col>
          </Grid>
          <TextCustom truncate bold>
            Lorem ipsum dolor sit
          </TextCustom>
          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
            doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
            obcaecati quia suscipit numquam, voluptates commodi porro impedit
            natus quos doloremque!
          </TextCustom>
        </StackCustom>
      </BaseBox>
      <BaseBox>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${index}`} />
            </Grid.Col>
            <Grid.Col span={10} style={{ justifyContent: "center" }}>
              <TextCustom bold>Username</TextCustom>
            </Grid.Col>
          </Grid>
          <TextCustom truncate bold>
            Lorem ipsum dolor sit
          </TextCustom>
          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
            doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
            obcaecati quia suscipit numquam, voluptates commodi porro impedit
            natus quos doloremque!
          </TextCustom>
        </StackCustom>
      </BaseBox>
    </ViewWrapper>
  );
}
