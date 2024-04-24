import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../../../../store';
import { initialState } from '../inital_state';
import axios from 'axios';
import setup from '../../setup';
import { end_point } from '../../../../../../config/api';
import storeSlice from '..';

type ReturnType = void;
type PayloadType = { [key: string]: any };
type ThunkArgument = {
    dispatch: AppDispatch;
    state: typeof initialState;
};

const api_prefix = setup.api_prefix;
const store_prefix = setup.store_prefix;

const fetch_api = async (param, thunkAPI) => {
    const state: typeof initialState = thunkAPI.getState()[setup.module_name];
    const dispatch = thunkAPI.dispatch;

    dispatch(storeSlice.actions.set_is_loading(true));
    dispatch(storeSlice.actions.set_loading_text('loading..'));

    const qparams = {
        page: state[`page`],
        paginate: state[`paginate`],
        search_key: state[`search_key`],
        orderByCol: state[`orderByCol`],
        orderByAsc: state[`orderByAsc`],
        show_active_data: state[`show_active_data`],
    };

    const response = await axios.get(`${end_point}/${api_prefix}`, {
        params: {
            ...qparams,
        },
    });

    dispatch(storeSlice.actions.set_is_loading(false));

    return response.data;
};

export const all = createAsyncThunk<ReturnType, PayloadType, ThunkArgument>(
    `${store_prefix}/all`,
    fetch_api,
);
