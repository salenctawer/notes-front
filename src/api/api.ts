import axios from "axios";
import { FormFetchRegisterType, AddNoteType } from "../types/types";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

export const notesApi ={
    fetchNotes(){
        return instance.get('/notes')
    },
    fetchUserNotes(id?: String){
        return instance.get(`notes/user/${id}`)
    },
    addNote(params: AddNoteType){
        return instance.post(`notes`, params)
    },
    removeNote(id: String){
        return instance.delete(`notes/${id}`)
    }
}

export const authApi ={
    fetchAuth(params: any){   //типизировать
        return instance.post('/auth/login', params)
    },
    fetchAuthMe(){
        return instance.get('/auth/me')
    },
    fetchRegister(params: FormFetchRegisterType){
        return instance.post('/auth/register', params)
    }
}


instance.interceptors.request.use((config: any) => {                        //типизировать
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});