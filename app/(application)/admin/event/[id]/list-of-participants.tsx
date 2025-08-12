import { BadgeCustom, BaseBox, Grid, TextCustom, ViewWrapper } from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";

export default function AdminEventListOfParticipants() {

    const isPresent = ({id}: {id: number}) => {
        const check = id % 3 * 3;
        if (check === 0) {
            return true;
        } else {
            return false;
        }
    }

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Daftar Peserta" />}
      >
        {Array.from({ length: 10 }).map((item, index) => (
          <BaseBox key={index}>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom bold>Username {index + 1}</TextCustom>
                <TextCustom>+6282123456789</TextCustom>
              </Grid.Col>
              <Grid.Col span={6} style={{ justifyContent: "center" }}>
                <BadgeCustom
                  style={{ alignSelf: "flex-end" }}
                  color={isPresent({id: index}) ? MainColor.green : MainColor.red}
                >
                  {isPresent({id: index}) ? "Hadir" : "Tidak Hadir"}
                </BadgeCustom>
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))}
      </ViewWrapper>
    </>
  );
}
