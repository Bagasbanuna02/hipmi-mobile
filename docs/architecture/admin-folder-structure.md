# Struktur Folder Admin Aplikasi HIPMI Mobile

Dokumen ini menjelaskan struktur folder dan file untuk bagian admin dari aplikasi HIPMI Mobile yang terletak di `app/(application)/admin`.

## File dan Folder Tingkat Atas

### Folder
- `app-information` - Manajemen informasi aplikasi
- `collaboration` - Manajemen modul kolaborasi
- `donation` - Manajemen modul donasi
- `event` - Manajemen modul acara
- `forum` - Manajemen modul forum
- `investment` - Manajemen modul investasi
- `job` - Manajemen modul lowongan kerja
- `notification` - Manajemen notifikasi
- `super-admin` - Fungsi super admin
- `user-access` - Manajemen akses pengguna
- `voting` - Manajemen modul voting

### File
- `_layout.tsx` - Komponen tata letak untuk bagian admin
- `dashboard.tsx` - Tampilan dasbor admin
- `maps.tsx` - Fungsionalitas peta untuk admin

## Struktur Folder Terperinci

### app-information/
```
app-information/
├── business-field/
│   ├── [id]/
│   │   ├── bidang-update.tsx
│   │   ├── index.tsx
│   │   └── sub-bidang-update.tsx
│   └── create.tsx
├── information-bank/
│   ├── [id]/
│   │   └── index.tsx
│   └── create.tsx
├── sticker/
│   ├── [id]/
│   │   └── index.tsx
│   └── create.tsx
└── index.tsx
```

### collaboration/
```
collaboration/
├── [id]/
│   ├── [status].tsx
│   ├── group.tsx
│   └── reject-input.tsx
├── group.tsx
├── index.tsx
├── publish.tsx
└── reject.tsx
```

### donation/
```
donation/
├── [id]/
│   ├── [status]/
│   │   ├── index.tsx
│   │   └── transaction-detail.tsx
│   ├── detail-disbursement-of-funds.tsx
│   ├── disbursement-of-funds.tsx
│   ├── list-disbursement-of-funds.tsx
│   ├── list-of-donatur.tsx
│   └── reject-input.tsx
├── [status]/
│   └── status.tsx
├── category-create.tsx
├── category-update.tsx
├── category.tsx
└── index.tsx
```

### event/
```
event/
├── [id]/
│   ├── [status]/
│   │   └── index.tsx
│   ├── list-of-participants.tsx
│   └── reject-input.tsx
├── [status]/
│   └── status.tsx
├── index.tsx
├── type-create.tsx
├── type-of-event.tsx
└── type-update.tsx
```

### forum/
```
forum/
├── [id]/
│   ├── index.tsx
│   ├── list-comment.tsx
│   ├── list-report-comment.tsx
│   └── list-report-posting.tsx
├── index.tsx
├── posting.tsx
├── report-comment.tsx
└── report-posting.tsx
```

### investment/
```
investment/
├── [id]/
│   ├── [status]/
│   │   ├── index.tsx
│   │   └── transaction-detail.tsx
│   ├── list-of-investor.tsx
│   └── reject-input.tsx
├── [status]/
│   └── status.tsx
└── index.tsx
```

### job/
```
job/
├── [id]/
│   ├── [status]/
│   │   ├── index.tsx
│   │   └── reject-input.tsx
├── [status]/
│   └── status.tsx
└── index.tsx
```

### notification/
```
notification/
└── index.tsx
```

### super-admin/
```
super-admin/
├── [id]/
│   └── index.tsx
└── index.tsx
```

### user-access/
```
user-access/
├── [id]/
│   └── index.tsx
└── index.tsx
```

### voting/
```
voting/
├── [id]/
│   ├── [status]/
│   │   ├── index.tsx
│   │   └── reject-input.tsx
├── [status]/
│   └── status.tsx
├── history.tsx
└── index.tsx
```

## Rute Dinamis

Bagian admin menggunakan rute dinamis yang ditunjukkan dengan kurung siku `[ ]`:
- `[id]` - Rute dinamis untuk ID item tertentu
- `[status]` - Rute dinamis untuk tampilan berdasarkan status

Ini memungkinkan routing yang fleksibel berdasarkan parameter tertentu seperti ID item atau status.