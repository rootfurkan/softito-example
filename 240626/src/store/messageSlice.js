import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    {
      id: "FY",
      name: "Furkan Yorulmaz",
      role: "Admin",
      active: true,
      initials: "FY",
      bgClass: "avatar-indigo",
    },
    {
      id: "AD",
      name: "Ayşe Demir",
      role: "Muhasebe",
      active: true,
      initials: "AD",
      bgClass: "avatar-green",
    },
    {
      id: "MK",
      name: "Mehmet Kaya",
      role: "Teknik Destek",
      active: false,
      initials: "MK",
      bgClass: "avatar-red",
    },
    {
      id: "ZS",
      name: "Zeynep Şahin",
      role: "Proje Yöneticisi",
      active: true,
      initials: "ZS",
      bgClass: "avatar-blue",
    },
    {
      id: "EA",
      name: "Emre Arslan",
      role: "Yazılım Geliştirici",
      active: true,
      initials: "EA",
      bgClass: "avatar-orange",
    },
    {
      id: "BK",
      name: "Burak Koç",
      role: "Satış Uzmanı",
      active: false,
      initials: "BK",
      bgClass: "avatar-purple",
    },
    {
      id: "CN",
      name: "Ceren Nur",
      role: "İnsan Kaynakları",
      active: true,
      initials: "CN",
      bgClass: "avatar-pink",
    },
    {
      id: "OG",
      name: "Onur Güneş",
      role: "Sistem Uzmanı",
      active: true,
      initials: "OG",
      bgClass: "avatar-cyan",
    },
  ],
  activeContactId: "FY",
  threads: {
    FY: [
      {
        id: 1,
        sender: "AD",
        content:
          "Selam Furkan bey bugünkü toplantımızı erteleyebilir miyiz? Çok uykum var çünkü..",
        time: "10.30",
      },
      {
        id: 2,
        sender: "FY",
        content:
          "Selam dün gece uyuyamadınız sanırım.. Sebebini öğrenmek isterim.",
        time: "10.35",
      },
      {
        id: 3,
        sender: "AD",
        content:
          "Dün gece biraz dizi izledim ve dışarı çıktım o yüzden uyuyamadım.",
        time: "10.38",
      },
      {
        id: 4,
        sender: "FY",
        content:
          "Ertesi gün toplantı olacağını biliyorsunuz bu ne sorumsuzluk? Muhasebeye gidip çıkış işlemlerinizi yapın lütfen.",
        time: "10.40",
      },
    ],
    ZS: [
      {
        id: 1,
        sender: "MY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
    EA: [
      {
        id: 1,
        sender: "FY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
    BK: [
      {
        id: 1,
        sender: "AK",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
  },
};

const messageSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const activeId = state.activeContactId;
      if (!state.threads[activeId]) {
        state.threads[activeId] = [];
      }
      const timeStr = new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const nextId = state.threads[activeId].length > 0 ? Math.max(...state.threads[activeId].map(m=>m.id)) +1 : 1;
      state.threads[activeId].push({
        id : nextId,
        sender : 'FY',
        content : action.payload,
        time : timeStr
      });
    },
    setActiveContact : (state, action) =>{
        state.activeContactId = action.payload;
    },
  },
});
export const {sendMessage , setActiveContact} = messageSlice.actions
export default messageSlice.reducer;