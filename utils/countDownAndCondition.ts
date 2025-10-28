import dayjs from "dayjs";

export function countDownAndCondition({
  publishTime,
  duration,
}: {
  publishTime: Date;
  duration: number | string;
}) {
  const now = dayjs();
  const publish = dayjs(publishTime);
  const diffTime = publish.diff(now, "day");

  const durasi = Number(duration);
  const sisaHari = durasi + diffTime;

  return {
    durationDay: sisaHari,
    reminder: sisaHari <= 0,
  };
}
