import store from "../redux/store";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type NotesType = {
    _id: string,
    important: string,
    title: string,
    deadline: string,
    text: string
}