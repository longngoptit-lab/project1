import { configureStore } from '@reduxjs/toolkit';
import danhSachReducer from './danhSachSlice';
import settingReducer from './settingSlice';

export const store = configureStore({
  reducer: {
    danhSach: danhSachReducer,
    setting: settingReducer,
  },
});
