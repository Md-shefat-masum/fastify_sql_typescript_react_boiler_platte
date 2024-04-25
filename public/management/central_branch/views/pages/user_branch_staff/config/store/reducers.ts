import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './inital_state';

export const store_reducers = {
    set_is_loading: (
        state: typeof initialState,
        action: PayloadAction<boolean>,
    ) => {
        state.is_loading = action.payload;
    },
    set_loading_text: (
        state: typeof initialState,
        action: PayloadAction<string>,
    ) => {
        state.loading_text = action.payload;
    },
    set_all: (state: typeof initialState, action: PayloadAction<string>) => {
        state.all = action.payload;
    },
    set_page: (state: typeof initialState, action: PayloadAction<number>) => {
        state.page = action.payload;
    },
    set_url: (state: typeof initialState, action: PayloadAction<string>) => {
        state.url = action.payload;
    },
    set_show_filter_canvas: (
        state: typeof initialState,
        action: PayloadAction<boolean>,
    ) => {
        state.show_filter_canvas = action.payload;
    },
    set_paginate: (
        state: typeof initialState,
        action: PayloadAction<number>,
    ) => {
        state.paginate = action.payload;
    },
    set_search_key: (
        state: typeof initialState,
        action: PayloadAction<string>,
    ) => {
        state.search_key = action.payload;
    },
};
