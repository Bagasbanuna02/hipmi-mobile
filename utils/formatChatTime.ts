// utils/formatChatTime.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

dayjs.extend(relativeTime);
dayjs.locale('id');

/**
 * Format waktu pesan untuk tampilan chat
 * @param date ISO string atau Date object
 * @returns string formatted time
 */
export const formatChatTime = (date: string | Date): string => {
  const messageDate = dayjs(date);
  const now = dayjs();

  // Jika hari ini
  if (messageDate.isSame(now, 'day')) {
    return messageDate.format('HH.mm'); // contoh: "14.30"
  }

  // Jika kemarin
  if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Kemarin';
  }

  // Jika dalam 7 hari terakhir (tapi bukan kemarin/ hari ini)
  if (now.diff(messageDate, 'day') < 7) {
    return messageDate.format('dddd HH:mm'); // contoh: "Senin 14:30"
  }

  // Lebih dari seminggu lalu → tampilkan tanggal
  return messageDate.format('D MMM YYYY'); // contoh: "12 Mei 2024"
};
