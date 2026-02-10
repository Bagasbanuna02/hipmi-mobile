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
Masukan kode berikut di prop ListHeaderComponent:
 <InformationBox text="Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan pihak manapun, jika berita pencairan dana dibawah tidak sesuai dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain dapat melaporkannya pada Admin HIPMI !" />
        <BaseBox>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                Rp. {formatCurrencyDisplay(data?.totalPencairan)}
              </TextCustom>
              <TextCustom size="small">Total Pencairan Dana</TextCustom>
            </Grid.Col>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                {data?.akumulasiPencairan} kali
              </TextCustom>
              <TextCustom size="small">Akumulasi Pencairan</TextCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>

<!-- ===================== End Penerapan NewWrapper & Pagination ===================== -->

<!-- Start Penerapan NewWrapper -->
Terapkan NewWrapper pada file: app/(application)/(user)/donation/create.tsx
Component yang digunakan: components/_ShareComponent/NewWrapper.tsx 
<!-- End Penerapan NewWrapper -->

Bantu saya untuk memperbaiki logika path yang ada di dalam file "screens/Admin/Notification-Admin/ScreenNotificationAdmin2.tsx" , pada function fixPath
Saya ingin jika didalam deeplink ada "/admin/..." contoh "/admin/event/review/status" maka path yang akan di redirect adalah "/admin/event/review/status"
jika tidak maka terapkan sesuai dengan logika yang sudah ada

Bagaimana menangani bug berikut pada file berikut: screens/Invesment/Document/ScreenRecap.tsx 
Ini adalah halaman yang memiliki fungsi pagination , saya membuat data dummy dimana menghasilkan data urut 1-9, saya mencoba memuat halaman setiap page nya 4 saja untuk percobaan.
Saat awal muncul komponent box dengan data 9 - 6, kemudian saya hapus data ke 8 . lalu saya coba scroll ke bawah seharusnya angka akan tetap urut 9, 7, 6, 5, 4 ... 1. Tapi dalam case ini setelah 8 di hapus kemudian saya scroll box ke 5 tidak muncul saat di scroll. Apakah anda mengerti maksud saya ?

<!-- COMMIT &  PUSH-->
Branch: loaddata/10-feb-26
Jalankan perintah ini: git checkout -b "Branch"
Setelah itu jalankan perintah ini: git add .
Setelah itu jalankan perintah ini: git commit -m "
<Berikan semua catatan perubahan pada branch ini, tampilan pada saya dan pastikan dalam bahasa indonesia. Saya akan cek baru saya akan berikan perintah push>
"
Setelah itu jalankan perintah ini: git push origin "Branch"