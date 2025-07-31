import {
  BaseBox,
  CenterCustom,
  Grid,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconDocument, IconNews, IconProspectus } from "@/components/_Icon";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";

export default function Invesment_ComponentBoxOnBottomDetail({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <>
      {status === "publish" ? (
        <>
          <Grid>
            <Grid.Col span={6} style={{ paddingInline: 5, marginBlock: 0 }}>
              <BaseBox
                backgroundColor={AccentColor.blue}
                style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
                href={`/investment/${id}/prospektus/file`}
              >
                <StackCustom>
                  <TextCustom align="center">Prospektus</TextCustom>
                  <CenterCustom>
                    <IconProspectus size={50} color={MainColor.white} />
                  </CenterCustom>
                </StackCustom>
              </BaseBox>
            </Grid.Col>

            <Grid.Col span={6} style={{ paddingInline: 5, marginBlock: 0 }}>
              <BaseBox
                backgroundColor={AccentColor.blue}
                style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
                href={`/investment/${id}/(document)/list-of-document`}
              >
                <StackCustom>
                  <TextCustom align="center">Dokumen</TextCustom>
                  <CenterCustom>
                    <IconDocument size={50} color={MainColor.white} />
                  </CenterCustom>
                </StackCustom>
              </BaseBox>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6} style={{ paddingInline: 5, marginBlock: 0 }}>
              <BaseBox
                backgroundColor={AccentColor.blue}
                style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
                href={`/investment/${id}/investor`}
              >
                <StackCustom>
                  <TextCustom align="center">Investor</TextCustom>
                  <CenterCustom>
                    <Ionicons
                      name="cash-outline"
                      size={50}
                      color={MainColor.white}
                    />
                  </CenterCustom>
                </StackCustom>
              </BaseBox>
            </Grid.Col>

            <Grid.Col span={6} style={{ paddingInline: 5, marginBlock: 0 }}>
              <BaseBox
                backgroundColor={AccentColor.blue}
                style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
                href={`/investment/${id}/list-of-news`}
              >
                <StackCustom>
                  <TextCustom align="center">Berita</TextCustom>
                  <CenterCustom>
                    <IconNews size={50} color={MainColor.white} />
                  </CenterCustom>
                </StackCustom>
              </BaseBox>
            </Grid.Col>
          </Grid>
        </>
      ) : (
        <Grid>
          <Grid.Col span={6} style={{ paddingRight: 10 }}>
            <BaseBox
              backgroundColor={AccentColor.blue}
              style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
              href={`/investment/${id}/prospektus/file`}
            >
              <StackCustom>
                <TextCustom align="center">Prospektus</TextCustom>
                <CenterCustom>
                  <IconProspectus size={50} color={MainColor.white} />
                </CenterCustom>
              </StackCustom>
            </BaseBox>
          </Grid.Col>

          <Grid.Col span={6} style={{ paddingLeft: 10 }}>
            <BaseBox
              backgroundColor={AccentColor.blue}
              style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
              href={`/investment/${id}/(document)/list-of-document`}
            >
              <StackCustom>
                <TextCustom align="center">Dokumen</TextCustom>
                <CenterCustom>
                  <IconDocument size={50} color={MainColor.white} />
                </CenterCustom>
              </StackCustom>
            </BaseBox>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
}
