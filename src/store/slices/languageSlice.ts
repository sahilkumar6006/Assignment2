import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LanguageState = {
  code: 'en' | 'ar';
};

const initialState: LanguageState = {
  code: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.code = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
