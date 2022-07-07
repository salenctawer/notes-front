import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/api";
import { UserDataType } from "../types/types";

export const fetchUserData = createAsyncThunk('/auth/fetchUserData', async (params)=>{
    const {data} = await authApi.fetchUserData(params)
    return  data
})

type AuthStateType = {
    data:UserDataType[] | null,
    status: 'error' | 'loading' | 'loaded'
}

const initialState:AuthStateType= {
    data: null, 
    status: 'loading'
} 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => { 
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchUserData.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        })
      
    }
    
})
export default authSlice.reducer