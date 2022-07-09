import React from "react";
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from './Login.module.scss'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAuth, selectAuth } from "../../redux/authSlice";
import { FormFetchAuthType } from "../../types/types";


const Login: React.FC = () =>{
    
    const isAuth = useAppSelector(selectAuth)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormFetchAuthType>()

    const dispatch = useAppDispatch()

    const onSubmit = async (values: FormFetchAuthType) =>{
      const data:any = await dispatch(fetchAuth(values))         //типизировать

      if(!data.payload){
        return alert('Не удалось авторизоваться')
      }
      if('token' in data.payload){
        window.localStorage.setItem('token', data.payload.token)
      } 
    }



    if(isAuth){
      return <Navigate to='/'/>
    }

    return(<div>
        <form className={s.form} onSubmit={handleSubmit((values)=>onSubmit(values))}>
          <DialogTitle>Авторизация</DialogTitle>
          <DialogContent>
            <TextField
              {...register("email", {
                required: {
                  value: true,
                  message: "Это поле обязательно",
                },
              })}
              autoFocus
              margin="dense"
              id="email"
              label="Почта"
              type="text"
              fullWidth
              variant="standard"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password", {
                required: {
                  value: true,
                  message: "Это поле обязательно",
                },
              })}
              autoFocus
              margin="dense"
              id="password"
              label="Пароль"
              type="text"
              fullWidth
              variant="standard"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />
          </DialogContent>
          <Button 
            variant="contained"
            type='submit'
            sx={{
              marginTop: 2
            }}
          >
              Готово
          </Button>
        </form>
      </div>)
}

export default Login