import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        table: tableReducer,

    }
})
export default store