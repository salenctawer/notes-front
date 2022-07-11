import { FormFetchAuthType, FormFetchRegisterType, RootState } from './../types/types';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/api";
import { AuthType } from "../types/types";

export const fetchAuth = createAsyncThunk<AuthType, FormFetchAuthType>('/auth/fetchAuth', async (params)=>{
    const {data} = await authApi.fetchAuth(params)
    return  data
})

export const fetchAuthMe = createAsyncThunk<any, void>('/auth/fetchAuthMe', async ()=>{  //типизировать
    const {data} = await authApi.fetchAuthMe()
    return  data
})

export const fetchRegister = createAsyncThunk<any, FormFetchRegisterType>('/reg/fetchRegister', async(params)=>{ //типизировать
    const {data} = await authApi.fetchRegister(params)
    return data
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
    reducers: {
        logout: (state) =>{
            state.data = null
        }
    },
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
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => { 
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        })
        builder.addCase(fetchRegister.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => { 
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        })
      
    }
    
})

export const selectAuth = (state: any) => {         //типизировать
    return Boolean(state.auth.data)
}

export const {logout} = authSlice.actions

export default authSlice.reducer