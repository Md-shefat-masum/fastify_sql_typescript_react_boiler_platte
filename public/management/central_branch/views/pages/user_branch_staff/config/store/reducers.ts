import { PayloadAction } from '@reduxjs/toolkit';
import store, { useAppDispatch } from '../../../../../store';
import { all } from './async_actions/all';

export const store_reducers = {
    set_is_loading: (state, action: PayloadAction<boolean>) => {
        state.is_loading = action.payload;
    },
    set_loading_text: (state, action: PayloadAction<string>) => {
        state.loading_text = action.payload;
    },
    set_all: (state, action: PayloadAction<string>) => {
        state.all = action.payload;
    },
    set_page: (state, action: PayloadAction<string>) => {
        state.page = action.payload;
    },
    set_url: (state, action: PayloadAction<string>) => {
        state.url = action.payload;
    },
    set_paginate: (state, action: PayloadAction<string>) => {
        state.paginate = action.payload;
    },
};
