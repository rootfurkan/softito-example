import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice ve createAsyncThunk fonksiyonlarını içe aktarır.

// ==========================
// ASYNC THUNKS
// ==========================

// Mesajlar ve kişiler listesini db.json dosyasından getirir.
export const fetchMessages = createAsyncThunk(
  'messaging/fetchMessages', // Action adı
  async (_, { rejectWithValue }) => {
    try {
      // db.json dosyasına istek gönderilir.
      const response = await fetch('/db.json')

      // İstek başarısız olursa hata oluşturulur.
      if (!response.ok) throw new Error('Mesaj verileri yüklenemedi.')

      // JSON verisi okunur.
      const data = await response.json()

      // Kişiler ve mesajlar döndürülür.
      return {
        contacts: data.contacts,
        threads: data.threads
      }
    } catch (error) {
      // Hata oluşursa rejected durumuna gönderilir.
      return rejectWithValue(error.message)
    }
  }
)

// Yeni mesaj gönderme işlemi.
export const sendMessageAsync = createAsyncThunk(
  'messaging/sendMessageAsync',
  async (messageText, { getState, rejectWithValue }) => {
    try {
      // API isteğini simüle etmek için 350 ms beklenir.
      await new Promise((resolve) => setTimeout(resolve, 350))

      // Store'daki güncel state alınır.
      const state = getState()

      // Şu anda açık olan kişinin id'si alınır.
      const activeId = state.messaging.activeContactId

      // Mesaj gönderilme saati oluşturulur.
      const timeStr = new Date().toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      })

      // Yeni mesaj nesnesi oluşturulur.
      return {
        contactId: activeId, // Mesajın gönderileceği kişi

        message: {
          id: Date.now(),     // Benzersiz mesaj id'si
          sender: 'me',       // Gönderen kişi (ben)
          content: messageText, // Yazılan mesaj
          time: timeStr       // Gönderim saati
        }
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ==========================
// BAŞLANGIÇ STATE'İ
// ==========================

const initialState = {
  contacts: [],             // Kişi listesi
  activeContactId: 'AY',    // İlk açılacak sohbetin id'si
  threads: {},              // Tüm konuşmalar burada tutulur

  status: 'idle',           // Veri yükleme durumu
                             // idle | loading | succeeded | failed

  error: null,              // Hata mesajı

  actionStatus: 'idle',     // Mesaj gönderme işleminin durumu
}

// ==========================
// SLICE
// ==========================

const messageSlice = createSlice({
  name: 'messaging',        // Slice adı

  initialState,             // Başlangıç state'i

  reducers: {

    // Aktif konuşmayı değiştirir.
    setActiveContact: (state, action) => {
      state.activeContactId = action.payload
    }
  },

  // Async thunk'ların durumlarını yönetir.
  extraReducers: (builder) => {

    builder

      // ==========================
      // FETCH MESSAGES
      // ==========================

      // Veriler yükleniyor.
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading'
      })

      // Veriler başarıyla geldi.
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Kişiler listesi yüklenir.
        state.contacts = action.payload.contacts

        // Mesajlar yüklenir.
        state.threads = action.payload.threads
      })

      // Veri alınamadı.
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // ==========================
      // SEND MESSAGE
      // ==========================

      // Mesaj gönderiliyor.
      .addCase(sendMessageAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })

      // Mesaj başarıyla gönderildi.
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'

        // Dönen bilgiler ayrıştırılır.
        const { contactId, message } = action.payload

        // Eğer o kişiye ait mesaj dizisi yoksa oluşturulur.
        if (!state.threads[contactId]) {
          state.threads[contactId] = []
        }

        // Yeni mesaj konuşma dizisinin sonuna eklenir.
        state.threads[contactId].push(message)
      })

      // Mesaj gönderilemedi.
      .addCase(sendMessageAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

// Reducer'lardan oluşturulan action dışa aktarılır.
export const { setActiveContact } = messageSlice.actions

// Reducer store'a eklenmek üzere dışa aktarılır.
export default messageSlice.reducer