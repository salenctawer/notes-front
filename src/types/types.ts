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

export type AuthType = {
    _id: String,
    fullName: String,
    email: String,
    avatarUrl: String,
}

export type FormFetchRegisterType ={
    email: String,
    fullName: String,
    avatarUrl?: any,  //типизировать
    password: String,
    confirmPassword?: String
}

export type FormFetchAuthType ={
    email: String,
    password: String
}

export type AddNoteType = {
    title: String,
    deadline: String,
    text: String,
    important: String
}