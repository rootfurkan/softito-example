import { createSlice } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice fonksiyonunu içe aktarır.

// Başlangıç (initial) state'i tanımlanıyor.
const initialState = {
  user: null,                 // Giriş yapan kullanıcı bilgisi (başlangıçta yok)
  isAuthenticated: false,     // Kullanıcı giriş yapmış mı? Başlangıçta hayır.
  activeTab: 'login',         // İlk açılacak ekran login sekmesi
}

// Auth (kimlik doğrulama) işlemleri için slice oluşturuluyor.
const authSlice = createSlice({
  name: 'auth',               // Slice'ın adı (action isimlerinde kullanılır)

  initialState,               // Başlangıç state'i

  reducers: {
    // Kullanıcı giriş yaptığında çalışır.
    login: (state, action) => {
      state.isAuthenticated = true // Kullanıcı giriş yaptı.

      // Kullanıcı bilgileri oluşturuluyor.
      state.user = {
        name: 'Selahaddin A.',      // Kullanıcı adı (şimdilik sabit)
        role: action.payload,       // Rol dispatch ile gönderiliyor.
                                    // Örneğin: "Admin", "Muhasebe", "Teknik"
      }

      // Başarılı girişten sonra Dashboard ekranına geçilir.
      state.activeTab = 'dashboard'
    },

    // Kullanıcı çıkış yaptığında çalışır.
    logout: (state) => {
      state.isAuthenticated = false // Giriş bilgisi sıfırlanır.
      state.user = null             // Kullanıcı bilgileri silinir.
      state.activeTab = 'login'     // Login ekranına geri dönülür.
    },

    // Aktif sekmeyi değiştirmek için kullanılır.
    setActiveTab: (state, action) => {
      state.activeTab = action.payload // Yeni sekme adı payload'dan alınır.
    },
  },
})

// Reducer'lardan otomatik oluşturulan action'lar dışa aktarılıyor.
export const { login, logout, setActiveTab } = authSlice.actions

// Reducer store'a eklenebilmesi için dışa aktarılıyor.
export default authSlice.reducer