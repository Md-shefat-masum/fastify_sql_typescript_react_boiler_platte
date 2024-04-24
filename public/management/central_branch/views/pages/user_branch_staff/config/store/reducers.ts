import { PayloadAction } from '@reduxjs/toolkit';
export const store_reducers = {
    set_is_loading: (state, action: PayloadAction<boolean>) => {
        state.is_loading = action.payload;
    },
    set_loading_text: (state, action: PayloadAction<string>) => {
        state.loading_text = action.payload;
    },
};
