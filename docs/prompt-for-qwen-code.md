<!-- Start Penerapan Pagination -->

File utama: screens/Admin/Notification-Admin/ScreenNotificationAdmin2.tsx
Fun fecth: apiGetNotificationsById
File fetch: service/api-notifications.ts
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Terapkan pagination pada file "File utama"
Analisa juga file "File utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper

Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx

Perbaiki fetch "Fun fecth" , pada file "File fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1"

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.

<!-- End Penerapan Pagination -->

<!-- Start Penerapan NewWrapper -->
Terapkan NewWrapper pada file: screens/Forum/DetailForum.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx , karena ini adalah halaman detail saya ingin anda fokus pada props pada NewWrapper. Seperti 