import { configureStore } from '@reduxjs/toolkit';
import user_branch_staff_slice from '../views/pages/user_branch_staff/config/store';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        user_branch_staff: user_branch_staff_slice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
