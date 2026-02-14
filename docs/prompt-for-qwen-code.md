<!-- ===================== Start Penerapan Pagination Dari Source ===================== -->

File source: app/(application)/(user)/donation/[id]/fund-disbursement.tsx
Folder tujuan: screens/Donation
Nama file utama: ScreenFundDisbursement.tsx

Buat file baru pada "Folder tujuan" dengan nama "Nama file utama" dan ubah nama function menjadi "Donation_ScreenFundDisbursement" kemudian clean code, import dan panggil function tersebut pada file "File source" 
Selanjutnya terapkan pagination pada file "Nama file utama"

Function fecth: apiDonationDisbursementOfFundsListById
File function fetch: service/api-client/api-donation.ts
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Terapkan pagination pada file "Nama file utama"
Analisa juga file "Nama file utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper

Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx

Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1"

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.

<!-- Additional Prompt -->
File refrensi: screens/Donation/ScreenListOfNews.tsx
Anda bisa menggunakan refrensi dari "File refrensi" jika butuh pemahaman dengan tipe fitur yang sama

<!-- ===================== End Penerapan Pagination ` ===================== -->

<!-- ===================== Start Penerapan NewWrapper & Pagination ===================== -->
File utama: screens/Donation/ScreenFundDisbursement.tsx
Function fecth: apiDonationDisbursementOfFundsListById
File function fetch: service/api-client/api-donation.ts
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Terapkan pagination pada file "File utama"
Analisa juga file "File utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper

Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx

Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1"

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.


<!-- Additinal prompt -->

<!-- ===================== End Penerapan NewWrapper & Pagination ===================== -->

<!-- Start Penerapan NewWrapper -->
Terapkan NewWrapper pada file: app/(application)/(user)/donation/create.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx 
<!-- End Penerapan NewWrapper -->

<!-- Start Random Prompt -->


Gunakan bahasa indonesia pada cli agar saya mudah membacanya.eclar
<!-- End Random Prompt -->

<!-- START Prompt Admin Refactoring -->
<!-- Pindah kode ke Screen Component -->
File source: app/(application)/admin/job/[status]/status.tsx
Folder tujuan: screens/Admin/Job
Nama file utama: ScreenJobStatus.tsx
Nama function utama: Admin_ScreenJobStatus
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Buat file baru pada "Folder tujuan" dengan nama "Nama file utama" dan ubah nama function menjadi "Nama function utama" kemudian clean code, import dan panggil function tersebut pada file "File source" 
Analisa juga file "Nama file utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper


<!-- Penerapan Pagination -->
Function fecth: apiAdminJob
File function fetch: service/api-admin/api-admin-job.ts

Terapkan pagination pada file "Nama file utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )
Kemudian rapikan code nya pisah komponen seperti render item dan lainnya agar lebih rapi dan di dalam return panggil komponen tersebut

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.
<!-- END Prompt Admin Refactoring -->

<!-- Use Prompt Now -->
Terapkan NewWrapper pada file: screens/Admin/App-Information/InformationBankSection.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx 

Function fecth: apiAdminMasterBank
File function fetch: service/api-admin/api-master-admin.ts

Terapkan pagination pada file "Nama file utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )
<!-- Baru -->
File Utama: screens/Admin/App-Information/InformationBankSection.tsx
Terapkan FlatList dan pagination pada file "File Utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Function fecth: apiAdminMasterBank
File function fetch: service/api-admin/api-master-admin.ts
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )
Jika butuh refrensi FlatList bisa lihat pada  file components/_ShareComponent/NewWrapper.tsx
<!-- END Use Prompt Now -->
