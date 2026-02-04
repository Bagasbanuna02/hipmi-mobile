<!-- ===================== Start Penerapan Pagination ===================== -->

File utama: screens/Event/ScreenListOfParticipants.tsx
Function fecth: apiEventListOfParticipants
File function fetch: service/api-client/api-event.ts
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Terapkan pagination pada file "File utama"
Analisa juga file "File utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper

Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx

Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1"

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.

<!-- File refrensi: screens/Job/MainViewStatus2.tsx
Anda bisa menggunakan refrensi dari "File refrensi" jika butuh pemahaman dengan tipe fitur yang sama -->

<!-- ===================== End Penerapan Pagination ===================== -->

<!-- Start Penerapan NewWrapper -->
Terapkan NewWrapper pada file: screens/Forum/DetailForum.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx , karena ini adalah halaman detail saya ingin anda fokus pada props pada NewWrapper. Seperti 
<!--  -->