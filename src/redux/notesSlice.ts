import { notesApi } from './../api/api';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NotesType } from '../types/types';

export const fetchNotes = createAsyncThunk<NotesType[], void>(
    'notes/fetchNotes', 
    async()=>{ 
    const {data}= await notesApi.fetchNotes()
    return data
})

type NotesStateType = {
    notes:{
        items:NotesType[],
        status: 'error' | 'loading' | 'loaded'
    }
}

const initialState: NotesStateType = {
    notes:{
        items:[

        ],
        status: 'loading'
    }
} 

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchNotes.pending, (state) => {
            state.notes.items = [];
            state.notes.status = 'loading';
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) => { 
            state.notes.items = action.payload;
            state.notes.status = 'loaded';
        })
        builder.addCase(fetchNotes.rejected, (state) => {
            state.notes.items = [];
            state.notes.status = 'error';
        })
      
    }
    
})



export default notesSlice.reducer