import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notesSlice from "./notesSlice";

const store = configureStore({
    reducer: {
        notes: notesSlice,
        auth: authSlice
    }
})

export default store