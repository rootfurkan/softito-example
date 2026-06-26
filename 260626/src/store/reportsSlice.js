import { createSlice } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice fonksiyonunu içe aktarır.

// ==========================
// BAŞLANGIÇ STATE'İ
// ==========================

const initialState = {

  // Oluşturulan raporların tutulduğu liste
  reportsList: [

    {
      id: 1,                                // Raporun benzersiz id'si
      title: 'Q2_Ciro_Raporu.pdf',          // Dosya adı
      size: '2.4 MB',                       // Dosya boyutu
      date: '22.06.2026 16:30',             // Oluşturulma tarihi
      url: '#',                             // Dosya bağlantısı (şimdilik örnek)
    },

    {
      id: 2,
      title: 'Stok_Sayim_Listesi.xlsx',
      size: '840 KB',
      date: '22.06.2026 09:15',
      url: '#',
    },
  ],
}

// ==========================
// SLICE
// ==========================

const reportsSlice = createSlice({

  // Slice adı
  name: 'reports',

  // Başlangıç state'i
  initialState,

  reducers: {

    // Yeni rapor oluşturur.
    generateReport: (state, action) => {

      // Formdan gelen bilgiler alınır.
      // Örneğin:
      // type   = "Finansal Ciro Raporu"
      // range  = "Son 30 Gün"
      // format = "PDF"

      const { type, range, format } = action.payload

      // ==========================
      // DOSYA UZANTISI BELİRLENİR
      // ==========================

      // Eğer format Excel ise uzantı xlsx,
      // değilse pdf kullanılır.
      const fileExt =
        format === 'Excel (.xlsx)'
          ? 'xlsx'
          : 'pdf'

      // ==========================
      // DOSYA ADI OLUŞTURULUR
      // ==========================

      // Rapor adındaki kelimelerin ilk harfleri alınır.
      // "Finansal Ciro Raporu"
      // =>
      // FCR

      const titleAbbr =
        type
          .split(' ')
          .map(w => w[0])
          .join('')
          .toUpperCase()

      // Dosya adında boşluk yerine "_" kullanılır.
      // "Son 30 Gün"
      // =>
      // Son_30 Gün

      const rangeClean =
        range.replace(' ', '_')

      // Tam dosya adı oluşturulur.
      // Örneğin:
      // FCR_Raporu_Son_30_Gün.pdf

      const title =
        `${titleAbbr}_Raporu_${rangeClean}.${fileExt}`

      // ==========================
      // DOSYA BOYUTU OLUŞTURULUR
      // ==========================

      // 1.2 ile 4.2 MB arasında rastgele boyut oluşturulur.
      const sizeNum =
        (1.2 + Math.random() * 3).toFixed(1)

      const size = `${sizeNum} MB`

      // ==========================
      // TARİH OLUŞTURULUR
      // ==========================

      // Güncel tarih ve saat alınır.
      const dateStr = new Date().toLocaleString('tr-TR', {

        day: '2-digit',

        month: '2-digit',

        year: 'numeric',

        hour: '2-digit',

        minute: '2-digit',
      })

      // ==========================
      // YENİ ID OLUŞTURULUR
      // ==========================

      // Listedeki en büyük id bulunur ve 1 artırılır.
      // Liste boşsa id = 1 olur.

      const nextId =
        state.reportsList.length > 0
          ? Math.max(...state.reportsList.map(r => r.id)) + 1
          : 1

      // ==========================
      // YENİ RAPOR EKLENİR
      // ==========================

      // Yeni rapor listenin başına eklenir.
      state.reportsList.unshift({

        id: nextId,

        title,

        size,

        date: dateStr,

        url: '#',
      })
    },
  },
})

// Reducer'lardan oluşturulan action dışa aktarılır.
export const { generateReport } = reportsSlice.actions

// Reducer store'a eklenmek üzere dışa aktarılır.
export default reportsSlice.reducer