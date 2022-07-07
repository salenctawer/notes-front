import { FormFetchAuthType } from './../types/types';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/api";
import { AuthType } from "../types/types";

export const fetchAuth = createAsyncThunk<AuthType, FormFetchAuthType>('/auth/fetchAuth', async (params)=>{
    const {data} = await authApi.fetchAuth(params)
    return  data
})

type AuthStateType = {
    data:AuthType | null,
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
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => { 
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        })
      
    }
    
})
export default authSlice.reducer