import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const settingSlice = createSlice({
  name: 'setting',

  initialState,

  reducers: {
    doiCheDo: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { doiCheDo } = settingSlice.actions;

export default settingSlice.reducer;