import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';
import userReducer from './userSlice'
import loadingReducer from './loadingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        table: tableReducer,
        loading: loadingReducer,
    }
})
export default store