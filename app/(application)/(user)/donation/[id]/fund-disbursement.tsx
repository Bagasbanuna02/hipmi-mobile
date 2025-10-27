import {
  BaseBox,
  ButtonCenteredOnly,
  Grid,
  InformationBox,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";

export default function DonationFundDisbursement() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <ViewWrapper>
        <InformationBox text="Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan pihak manapun, jika berita pencairan dana dibawah tidak sesuai dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain dapat melaporkannya pada Admin HIPMI !" />
        <BaseBox>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                Rp. 0
              </TextCustom>
              <TextCustom size="small">Total Pencairan Dana</TextCustom>
            </Grid.Col>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                0 kali
              </TextCustom>
              <TextCustom size="small">Akumulasi Pencairan</TextCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>

        {Array.from({ length: 10 }).map((_, index) => (
          <BaseBox key={index}>
            <StackCustom>
              <Grid>
                <Grid.Col span={8}>
                  <TextCustom bold>Pencairan ke - {index + 1}</TextCustom>
                </Grid.Col>
                <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
                  <TextCustom>{dayjs().format("DD MMM YYYY")}</TextCustom>
                </Grid.Col>
              </Grid>
              <TextCustom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt dolor ad sit? Eaque rem nihil natus, id, esse possimus
                perferendis provident velit illo consectetur distinctio ab
                accusantium quis earum omnis!
              </TextCustom>
              <ButtonCenteredOnly
                onPress={() => {
                  router.navigate(`/(application)/(file)/${id}`);
                }}
                icon="file-text"
              >
                Bukti Transaksi
              </ButtonCenteredOnly>
            </StackCustom>
          </BaseBox>
        ))}
      </ViewWrapper>
    </>
  );
}
