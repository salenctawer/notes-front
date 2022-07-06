import React from "react";
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from './Login.module.scss'

interface FormValues{
  password: string,
  email: string
}

const Login: React.FC = () =>{
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValues>()

    let redirect = useNavigate()

    const onSubmit = (data: FormValues) =>{
      redirect('/')
    }

    return(<div>
        <form className={s.form} onSubmit={handleSubmit((data)=>onSubmit(data))}>
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