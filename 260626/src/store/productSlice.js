import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice ve createAsyncThunk fonksiyonlarını içe aktarır.

// ==========================
// ASYNC THUNKS
// ==========================

// Ürün listesini db.json dosyasından getirir.
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Action adı
  async (_, { rejectWithValue }) => {
    try {
      // db.json dosyasına istek gönderilir.
      const response = await fetch('/db.json')

      // İstek başarısız olursa hata oluşturulur.
      if (!response.ok) throw new Error('Ürün verileri yüklenemedi.')

      // JSON verisi okunur.
      const data = await response.json()

      // Sadece ürün listesi döndürülür.
      return data.products

    } catch (error) {
      // Hata oluşursa rejected durumuna gönderilir.
      return rejectWithValue(error.message)
    }
  }
)

// Yeni ürün ekleme işlemi.
export const addProductAsync = createAsyncThunk(
  'products/addProductAsync',
  async (productData, { rejectWithValue }) => {
    try {

      // API isteğini simüle etmek için 600 ms beklenir.
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Kategori adının ilk 3 harfi alınır.
      // Örneğin Bilgisayar → BIL
      const categoryAbbr =
        (productData.category || 'GEN')
        .substring(0, 3)
        .toUpperCase()

      // 100-999 arasında rastgele sayı üretilir.
      const randomNum = Math.floor(100 + Math.random() * 900)

      // SKU kodu oluşturulur.
      // Örneğin SKU-583-BIL
      const sku = `SKU-${randomNum}-${categoryAbbr}`

      // Varsayılan ikon
      let iconType = 'box'

      // Kategoriye göre ikon belirlenir.
      if (productData.category === 'Bilgisayar')
        iconType = 'desktop'

      else if (productData.category === 'Telefon')
        iconType = 'phone'

      else if (productData.category === 'Aksesuar')
        iconType = 'mouse'

      // Yeni ürün oluşturulur.
      return {

        id: Date.now(), // Benzersiz id

        sku,            // Oluşturulan stok kodu

        iconType,       // Ürün ikonu

        ...productData, // Formdan gelen bilgiler

        // Fiyat sayı tipine çevrilir.
        price: parseFloat(productData.price) || 0
      }

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Ürün güncelleme işlemi.
export const editProductAsync = createAsyncThunk(
  'products/editProductAsync',
  async (productData, { rejectWithValue }) => {
    try {

      // API gecikmesi simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Güncellenen ürün geri döndürülür.
      return productData

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Ürün silme işlemi.
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProductAsync',
  async (productId, { rejectWithValue }) => {
    try {

      // API gecikmesi simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Silinecek ürünün id'si döndürülür.
      return productId

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Yeni kategori ekleme işlemi.
export const addCategoryAsync = createAsyncThunk(
  'products/addCategoryAsync',
  async (catName, { rejectWithValue }) => {
    try {

      // API gecikmesi simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Yeni kategori adı döndürülür.
      return catName

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ==========================
// BAŞLANGIÇ STATE'İ
// ==========================

const initialState = {

  // Ürün kategorileri
  categories: [
    'Hepsi',
    'Bilgisayar',
    'Telefon',
    'Aksesuar',
    'Yazıcı',
    'Yazılım Lisansları'
  ],

  // Seçili kategori
  selectedCategory: 'Hepsi',

  // Düzenlenecek ürün
  selectedProduct: null,

  // Ürün listesi
  list: [],

  // Veri yükleme durumu
  // idle | loading | succeeded | failed
  status: 'idle',

  // Hata mesajı
  error: null,

  // Ekleme, silme ve güncelleme işlemlerinin durumu
  actionStatus: 'idle',
}

// ==========================
// SLICE
// ==========================

const productSlice = createSlice({

  // Slice adı
  name: 'products',

  // Başlangıç state'i
  initialState,

  reducers: {

    // Seçili kategoriyi değiştirir.
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },

    // Düzenlenecek ürünü seçer.
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },

    // Seçili ürünü temizler.
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
    extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list.push(action.payload)
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Edit
      .addCase(editProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const index = state.list.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          let iconType = 'box'
          if (action.payload.category === 'Bilgisayar') iconType = 'desktop'
          else if (action.payload.category === 'Telefon') iconType = 'phone'
          else if (action.payload.category === 'Aksesuar') iconType = 'mouse'

          state.list[index] = { 
            ...state.list[index], 
            ...action.payload, 
            iconType,
            price: parseFloat(action.payload.price) || 0 
          }
        }
        state.selectedProduct = null
      })
      .addCase(editProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Delete
      .addCase(deleteProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list = state.list.filter(p => p.id !== action.payload)
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Add Category
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        if (!state.categories.includes(action.payload)) {
          state.categories.push(action.payload)
        }
      })
  }
})

export const { 
  setSelectedCategory,
  setSelectedProduct,
  clearSelectedProduct
} = productSlice.actions
export default productSlice.reducer
