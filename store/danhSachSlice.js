import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  danhSach: [],
};

const danhSachSlice = createSlice({
  name: 'danhSach',

  initialState,

  reducers: {
    themNguoi: (state, action) => {
      state.danhSach.push(action.payload);
    },
       xoaNguoi: (state, action) => {
    state.danhSach = state.danhSach.filter(
      item => item.id !== action.payload
    );
    },
    reset: (state) => {
      state.danhSach=[];
    },
    capNhatNguoi: (state, action) => {
  state.danhSach = state.danhSach.map(item =>
    item.id === action.payload.id
      ? action.payload
      : item
  );
},
  }
});

export const { themNguoi, xoaNguoi, reset, capNhatNguoi } = danhSachSlice.actions;

export default danhSachSlice.reducer;