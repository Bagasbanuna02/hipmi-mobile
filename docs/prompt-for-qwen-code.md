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
File refrensi: screens/Admin/Event/ScreenEventStatus.tsx
Anda bisa menggunakan refrensi dari "File refrensi" jika butuh pemahaman dengan tipe fitur yang hampir sama

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

<!-- START Prompt Admin Refactoring -->
<!-- Pindah kode ke Screen Component -->
File source: app/(application)/admin/forum/[id]/list-comment.tsx
Folder tujuan: screens/Admin/Forum
Nama file utama: ScreenForumListComment.tsx
Nama function utama: Admin_ScreenForumListComment
File komponen wrapper: components/_ShareComponent/NewWrapper.tsx

Buat file baru pada "Folder tujuan" dengan nama "Nama file utama" dan ubah nama function menjadi "Nama function utama" kemudian clean code, import dan panggil function tersebut pada file "File source" 
Analisa juga file "Nama file utama" , jika belum menggunakan NewWrapper pada file "File komponen wrapper" , maka terapkan juga dan ganti wrapper lama yaitu komponen ViewWrapper


<!-- Penerapan Pagination -->
Function fecth: apiAdminForumCommentById
File function fetch: service/api-admin/api-admin-forum.ts

Terapkan pagination pada file "Nama file utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )
Kemudian rapikan code nya pisah komponen seperti render item dan lainnya agar lebih rapi dan di dalam return panggil komponen tersebut


Gunakan bahasa indonesia pada cli agar saya mudah membacanya.
<!-- END Prompt Admin Refactoring -->

<!-- Additional -->
File refrensi: screens/Admin/Forum/ScreenForumDetailReportPosting.tsx
Anda bisa menggunakan refrensi dari "File refrensi" jika butuh pemahaman dengan tipe fitur yang hampir sama

Untuk refrensi tampilan Box bisa anda gunakan dari file: screens/Admin/Donation/BoxDonationListOfDonatur.tsx dan buatkan komponen yang mirip untuk list of donatur dengan nama file: BoxDonationListOfInvestor.tsx




<!-- Use Prompt Now -->
Terapkan NewWrapper pada file: screens/Admin/App-Information/InformationBankSection.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx 

Function fecth: apiAdminMasterBank
File function fetch: service/api-admin/api-master-admin.ts

Terapkan pagination pada file "Nama file utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Perbaiki fetch "Function fecth" , pada file "File function fetch"
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )


<!-- Create FlatList -->
File Utama: screens/Admin/App-Information/InformationBankSection.tsx
Terapkan FlatList dan pagination pada file "File Utama"
Komponen pagination yang digunaka berada pada file hooks/use-pagination.tsx dan helpers/paginationHelpers.tsx
Function fecth: apiAdminMasterBank
File function fetch: service/api-admin/api-master-admin.ts
Jika tidak ada props page maka tambahkan props page dan default page: "1" ( string )
Jika butuh refrensi FlatList bisa lihat pada  file components/_ShareComponent/NewWrapper.tsx

<!-- Create Box -->
File Utama: app/(application)/(user)/maps/[id]/edit.tsx
Folder tujuan: screens/Maps
Nama file utama: ScreenMapsEdit.tsx
Nama function utama: Maps_ScreenMapsEdit

Buatkan file baru pada "Folder tujuan" dengan nama "Nama file utama" dan ubah nama function menjadi "Nama function utama" kemudian clean code, import dan panggil function tersebut pada file "File source" 

<!-- END Create Box -->

<!-- END Use Prompt Now -->
