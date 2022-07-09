import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

export const notesApi ={
    fetchNotes(){
        return instance.get('/notes')
    }
}

export const authApi ={
    fetchAuth(params: any){   //типизировать
        return instance.post('/auth/login', params)
    },
    fetchAuthMe(){
        return instance.get('/auth/me')
    }
}


instance.interceptors.request.use((config: any) => {                        //типизировать
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});