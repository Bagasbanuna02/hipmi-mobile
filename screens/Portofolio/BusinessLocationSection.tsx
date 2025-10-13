import {
  BaseBox,
  MapCustom,
  StackCustom,
  TextCustom
} from "@/components";

export default function Portofolio_BusinessLocation({
  data,
  imageId,
  setOpenDrawerLocation,
}: {
  data: any;
  imageId?: string;
  setOpenDrawerLocation: (value: boolean) => void;
}) {
  return (
    <>
      <BaseBox style={{ height: !data ? 200 : "auto" }}>
        <StackCustom>
          <TextCustom bold>Lokasi Bisnis</TextCustom>
          {!data ? (
            <TextCustom
              style={{ paddingTop: 50 }}
              align="center"
              color="gray"
              size={"small"}
              bold
            >
              Lokasi bisnis belum ditambahkan
            </TextCustom>
          ) : (
            <MapCustom
              latitude={data?.latitude}
              longitude={data?.longitude}
              namePin={data?.namePin}
              imageId={imageId}
              onPress={() => {
                setOpenDrawerLocation(true);
              }}
            />
          )}
        </StackCustom>
      </BaseBox>
    </>
  );
}
