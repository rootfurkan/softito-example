import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice ve createAsyncThunk fonksiyonlarını içe aktarır.

// ==========================
// ASYNC THUNKS
// ==========================

// Müşteri listesini db.json dosyasından getirir.
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers', // Action'ın adı
  async (_, { rejectWithValue }) => {
    try {
      // db.json dosyasına istek gönderilir.
      const response = await fetch('/db.json')

      // İstek başarısız olursa hata fırlatılır.
      if (!response.ok) throw new Error('Müşteri verileri yüklenemedi.')

      // JSON verisi okunur.
      const data = await response.json()

      // Sadece customers dizisi döndürülür.
      return data.customers
    } catch (error) {
      // Hata oluşursa rejected durumuna mesaj gönderilir.
      return rejectWithValue(error.message)
    }
  }
)

// Yeni müşteri ekleme işlemi.
export const addCustomerAsync = createAsyncThunk(
  'customers/addCustomerAsync',
  async (customerData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      return {
        id: Date.now(),      
        balance: 0,          
        ...customerData       // Formdan gelen bilgiler eklenir.
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Müşteri güncelleme işlemi.
export const editCustomerAsync = createAsyncThunk(
  'customers/editCustomerAsync',
  async (customerData, { rejectWithValue }) => {
    try {
      // API gecikmesi simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Güncellenmiş müşteri bilgisi döndürülür.
      return customerData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Müşteri silme işlemi.
export const deleteCustomerAsync = createAsyncThunk(
  'customers/deleteCustomerAsync',
  async (customerId, { rejectWithValue }) => {
    try {
      // API gecikmesi simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Silinecek müşterinin id'si döndürülür.
      return customerId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ==========================
// BAŞLANGIÇ STATE'İ
// ==========================

const initialState = {
  list: [],                     // Müşteri listesi
  selectedCustomer: null,       // Düzenlenecek müşteri
  status: 'idle',               // Veri yükleme durumu
                                 // idle | loading | succeeded | failed
  error: null,                  // Hata mesajı

  actionStatus: 'idle',         // Ekleme, silme, güncelleme işlemlerinin durumu
                                 // idle | loading | succeeded | failed
}

// ==========================
// SLICE
// ==========================

const customerSlice = createSlice({
  name: 'customers',           // Slice adı

  initialState,                // Başlangıç state'i

  reducers: {

    // Düzenlenecek müşteriyi seçer.
    selectCustomerForEdit: (state, action) => {
      state.selectedCustomer = action.payload
    },

    // Seçili müşteriyi temizler.
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },

  // Async thunk'ların durumlarını yönetir.
  extraReducers: (builder) => {

    builder

      // ==========================
      // FETCH CUSTOMERS
      // ==========================

      // Veri yükleniyor.
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading'
      })

      // Veri başarıyla geldi.
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })

      // Veri alınamadı.
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // ==========================
      // ADD CUSTOMER
      // ==========================

      // Ekleme işlemi başladı.
      .addCase(addCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })

      // Yeni müşteri başarıyla eklendi.
      .addCase(addCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'

        // Yeni müşteri listenin başına eklenir.
        state.list.unshift(action.payload)
      })

      // Ekleme başarısız.
      .addCase(addCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })

      // ==========================
      // EDIT CUSTOMER
      // ==========================

      // Güncelleme başladı.
      .addCase(editCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })

      // Güncelleme başarılı.
      .addCase(editCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'

        // Güncellenecek müşterinin index'i bulunur.
        const index = state.list.findIndex(c => c.id === action.payload.id)

        // Müşteri bulunduysa bilgileri güncellenir.
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],    // Eski bilgiler
            ...action.payload        // Yeni bilgiler
          }
        }

        // Düzenlenen müşteri temizlenir.
        state.selectedCustomer = null
      })

      // Güncelleme başarısız.
      .addCase(editCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })

      // ==========================
      // DELETE CUSTOMER
      // ==========================

      // Silme başladı.
      .addCase(deleteCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })

      // Silme başarılı.
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'

        // Silinen müşteri listeden çıkarılır.
        state.list = state.list.filter(
          c => c.id !== action.payload
        )
      })

      // Silme başarısız.
      .addCase(deleteCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

// Reducer'lardan oluşturulan action'lar dışa aktarılıyor.
export const {
  selectCustomerForEdit,
  clearSelectedCustomer
} = customerSlice.actions

// Reducer store'a eklenmek üzere dışa aktarılıyor.
export default customerSlice.reducer