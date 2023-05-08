import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
}

export const userSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        datosUsuario: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const {datosUsuario} = userSlice.actions;
export default userSlice.reducer