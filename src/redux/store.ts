import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notesSlice";

const store = configureStore({
    reducer: {
        notes: notesSlice.reducer
    }
})

export default store