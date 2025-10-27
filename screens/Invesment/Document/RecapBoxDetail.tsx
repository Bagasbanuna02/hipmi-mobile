import { BaseBox, ClickableCustom, Grid, TextCustom } from "@/components";
import { Href, router } from "expo-router";

export default function Investment_BoxDetailDocument({
  title,
  leftIcon,
  href,
}: {
  title: string;
  leftIcon?: React.ReactNode;
  href?: Href | string;
}) {
  return (
    <>
      <BaseBox>
        <Grid>
          <Grid.Col span={leftIcon ? 10 : 12}>
            <ClickableCustom onPress={() => router.push(href as any)}>
              <TextCustom truncate>
                {title ||
                  `Judul Dokumen: Lorem, ipsum dolor sit amet consectetur adipisicing elit.`}
              </TextCustom>
            </ClickableCustom>
          </Grid.Col>
          {leftIcon && <Grid.Col span={2}>{leftIcon}</Grid.Col>}
        </Grid>
      </BaseBox>
    </>
  );
}
