import { notesApi } from './../api/api';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotesType, AddNoteType } from '../types/types';

export const fetchUserNotes = createAsyncThunk<NotesType[], String | undefined>(
    'notes/fetchUserNotes', 
    async(id)=>{ 
    const {data}= await notesApi.fetchUserNotes(id)
    return data
})

export const addNote = createAsyncThunk<NotesType, AddNoteType>('notes/addNote', async(params: AddNoteType)=>{
    const {data} = await notesApi.addNote(params)
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
        builder.addCase(fetchUserNotes.pending, (state) => {
            state.notes.items = [];
            state.notes.status = 'loading';
        })
        builder.addCase(fetchUserNotes.fulfilled, (state, action) => { 
            state.notes.items = action.payload;
            state.notes.status = 'loaded';
        })
        builder.addCase(fetchUserNotes.rejected, (state) => {
            state.notes.items = [];
            state.notes.status = 'error';
        })
      
    }
    
})



export default notesSlice.reducer