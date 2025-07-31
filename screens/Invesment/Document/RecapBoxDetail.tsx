import { BaseBox, Grid, TextCustom } from "@/components";
import { Href } from "expo-router";

export default function Investment_BoxDetailDocument({
  title,
  leftIcon,
  href,
}: {
  title: string;
  leftIcon?: React.ReactNode;
  href?: Href;
}) {
  return (
    <>
      <BaseBox href={href}>
        <Grid>
          <Grid.Col span={leftIcon ? 10 : 12}>
            <TextCustom truncate>
              {title ||
                `Judul Dokumen: Lorem, ipsum dolor sit amet consectetur adipisicing elit.`}
            </TextCustom>
          </Grid.Col>
          {leftIcon && <Grid.Col span={2}>{leftIcon}</Grid.Col>}
        </Grid>
      </BaseBox>
    </>
  );
}
