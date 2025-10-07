import {
  BaseBox,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function DonationSuccess() {
  return (
    <ViewWrapper>
      <StackCustom>
        <BaseBox>
          <StackCustom>
            <FontAwesome6
              name="money-bill-wave"
              size={100}
              color={MainColor.green}
              style={GStyles.alignSelfCenter}
            />

            <TextCustom bold align="center">
              Terimakasih telah percaya pada kami untuk mengelola dana anda!
              Info mengenai update Penggalian Dana ini bisa di lihat di kolom
              berita.
            </TextCustom>
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <TextCustom bold align="center" size="large">
            Detail Transaksi
          </TextCustom>

          <Spacing />

          <StackCustom>
            {listData.map((item, i) => (
              <Grid key={i}>
                <Grid.Col span={5}>
                  <TextCustom bold>{item.label}</TextCustom>
                </Grid.Col>
                <Grid.Col span={7}>
                  <TextCustom style={{ paddingLeft: 10 }}>
                    {item.value}
                  </TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BaseBox>
      </StackCustom>
    </ViewWrapper>
  );
}

const listData = [
  {
    label: "Bank",
    value: " BCA",
  },
  {
    label: "Rekening Penerima",
    value: "Himpunan Pengusaha Muda Indonesia",
  },
  {
    label: "No Rekening",
    value: "2304235678854332",
  },
  {
    label: "Jumlah Donasi",
    value: "Rp. 750.000",
  },
  {
    label: "Tanggal",
    value: `${dayjs(new Date()).format("DD/MM/YYYY")}`,
  },
];
