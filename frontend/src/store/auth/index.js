import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Burada action üzerinden kullanıcı verilerini alabiliriz
      localStorage.setItem('user', JSON.stringify(action.payload)); // Kullanıcı bilgilerini local storage'a kaydediyoruz
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user'); // Kullanıcıyı çıkış yaptığında local storage'dan temizliyoruz
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
