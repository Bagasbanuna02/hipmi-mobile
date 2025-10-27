import {
  BaseBox,
  ButtonCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";

export default function AdminDonationDetailDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  const listData = [
    {
      label: "Nominal",
      value: "Rp 1.000.000",
    },
    {
      label: "Tanggal",
      value: dayjs().format("DD-MM-YYYY HH:mm"),
    },
    {
      label: "Judul",
      value: `Judul Pencairan Dana ${id}`,
    },
    {
      label: "Deskripsi",
      value: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque velit eos facere a dicta nemo repellendus harum laboriosam quos, earum reprehenderit. Nisi sapiente, quo earum quis alias ullam temporibus quidem.`,
    },
  ];
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Detail Pencairan Dana" />
        }
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

        <ButtonCustom
          onPress={() =>
            router.push(`/(application)/(image)/preview-image/${id}`)
          }
        >
          Cek Bukti Transaksi
        </ButtonCustom>
      </ViewWrapper>
    </>
  );
}
