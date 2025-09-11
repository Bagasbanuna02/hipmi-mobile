import dayjs from "dayjs";

export const dateTimeView = ({
  date,
  withoutTime = false,
}: {
  date: any;
  withoutTime?: boolean;
}) => {
  const newDate = dayjs(date).format(`DD-MM-YYYY, ${withoutTime ? "" : "HH:mm"}`);
  return newDate;
};
