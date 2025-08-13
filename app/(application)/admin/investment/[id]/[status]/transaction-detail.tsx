import {
  BadgeCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";

export default function AdminInvestmentTransactionDetail() {
  const { id } = useLocalSearchParams();

  const buttonAction = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Terima</ButtonCustom>
    </BoxButtonOnFooter>
  );

  const listData = [
    {
      label: "Investor",
      value: "Bagas Banuna",
    },
    {
      label: "Bank",
      value: "BCA",
    },
    {
      label: "Jumlah Investasi",
      value: "Rp. 1.000.000",
    },
    {
      label: "Status",
      value: <BadgeCustom color={MainColor.green}>Berhasil</BadgeCustom>,
    },
    {
      label: "Tanggal",
      value: dayjs().format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      label: "Bukti Transfer",
      value: (
        <ButtonCustom
          onPress={() =>
            router.push(`/(application)/(image)/preview-image/${id}`)
          }
        >
          Cek
        </ButtonCustom>
      ),
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Detail Transaksi Investor" />}
        footerComponent={buttonAction}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, index) => (
              <GridDetail_4_8
                key={index}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}
