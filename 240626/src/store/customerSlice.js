import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      name: "Furkan Yorulmaz",
      company: "FR Cyber Security LTD.",
      email: "furkan@root.com",
      phone: "555 021 32 45",
      balance: 12500,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      company: "Demir Yazılım A.Ş.",
      email: "ayse@demiryazilim.com",
      phone: "532 145 78 96",
      balance: 8750,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      company: "Kaya Lojistik",
      email: "mehmet@kayalojistik.com",
      phone: "541 887 23 11",
      balance: 3200,
      status: "Pasif",
    },
    {
      id: 4,
      name: "Zeynep Şahin",
      company: "Şahin Teknoloji",
      email: "zeynep@sahinteknoloji.com",
      phone: "507 654 12 89",
      balance: 18900,
      status: "Aktif",
    },
  ],
  selecterCustomer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: (state, action) => {
    addCustomer: (state, action) => {
      const nextId =
        state.list.length > 0
          ? Math.max(...state.list.map((c) => c.id)) + 1
          : 1;
      state.list.push({
        id: nextId,
        balance: 0,
        ...action.payload,
      });
    };
    editCustomer: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
      state.selecterCustomer = null;
    };
    deleteCustomer: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    };
    selectCustomerForEdit: (state, action) => {
      state.selecterCustomer = action.payload;
    };
    clearSelectedCustomer: (state) => {
      state.selecterCustomer = null;
    };
  },
});
export const {
  addCustomer,
  editCustomer,
  deleteCustomer,
  selectCustomerForEdit,
  clearSelectedCustomer,
} = customerSlice.actions;
export default customerSlice.reducer;
