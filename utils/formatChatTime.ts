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

  // Hari ini
  if (messageDate.isSame(now, 'day')) {
    return messageDate.format('HH.mm'); // "14.30"
  }

  // Kemarin
  if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
    return `Kemarin, ${messageDate.format('HH.mm')}`; // "Kemarin, 14.30"
  }

  // Dalam 7 hari terakhir (termasuk hari ini & kemarin sudah di-handle, jadi aman)
  if (now.diff(messageDate, 'day') < 7) {
    return `${messageDate.format('dddd')}, ${messageDate.format('HH.mm')}`; // "Senin, 13.00"
  }

  // Lebih dari 7 hari lalu
  return messageDate.format('DD - MM - YYYY, HH.mm'); // "05 - 11 - 2025, 14.00"
};