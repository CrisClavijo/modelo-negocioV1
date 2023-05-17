import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoader: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {startLoader } = loadingSlice.actions;
export default loadingSlice.reducer