import React from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Avatar, Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from './Registration.module.scss'
import { fetchRegister, selectAuth } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FormFetchRegisterType } from "../../types/types";



const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormFetchRegisterType>();

  const isAuth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const onSubmit = async (values: FormFetchRegisterType) =>{
    const data:any = await dispatch(fetchRegister(values))         //типизировать

      if(!data.payload){
        return alert('Не удалось зарегистрироваться')
      }
      if('token' in data.payload){
        window.localStorage.setItem('token', data.payload.token)
      } 
    }



    if(isAuth){
      return <Navigate to='/'/>
  }

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit((values)=>onSubmit(values))}>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContent sx={{paddingBottom: 0}}>
          <Avatar sx={{width:100, height:100, marginLeft: 'auto', marginRight:'auto'}}/>
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
            sx={{
              marginTop: 2
            }}
          />
          <TextField
            {...register("fullName", {
              required: {
                value: true,
                message: "Это поле обязательно",
              },
            })}
            autoFocus
            margin="dense"
            id="fullName"
            label="Ваше имя"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            sx={{
              marginTop: 2
            }}
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
            sx={{
              marginTop: 2
            }}
          />
          <TextField
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Это поле обязательно",
              },
              validate: (value) => {
                if (watch("password") != value) {
                  return "Пароли не совпадают";
                }
              }
            })}
            autoFocus
            margin="dense"
            id="confirmPassword"
            label="Повторите пароль"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errors.confirmPassword?.message)}
            helperText={errors.confirmPassword?.message}
            sx={{
              marginTop: 2
            }}
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
    </div>
  );
};

export default Registration;