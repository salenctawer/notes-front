import { notesApi } from './../api/api';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getNotes = createAsyncThunk('notes/getNotes', async()=>{
    const {data} = await notesApi.getNotes()
    return data
})


const initialState = {
    notes:{
        items:[

        ],
        status: 'loading'
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        extraReducers:{
            [getNotes.pending] : (state, action) =>{
                state.notes.items = []
                state.notes.status = 'loading'
            },
            [getNotes.fulfilled] : (state, action) =>{
                state.notes.items = action.payload
                state.notes.status = 'loaded'
            },
            [getNotes.rejected] : (state) =>{
                state.notes.items = []
                state.notes.status = 'error'
            },
        }
    }
})

export default notesSlice