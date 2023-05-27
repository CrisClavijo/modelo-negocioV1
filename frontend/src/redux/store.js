import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';
import userReducer from './userSlice'
import loadingReducer from './loadingSlice';
import listasReducer from './listasSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        table: tableReducer,
        loading: loadingReducer,
        listas: listasReducer,
    }
})
export default store