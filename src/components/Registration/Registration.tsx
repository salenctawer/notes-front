import React from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from './Registration.module.scss'

interface FormValues{
  fullName: string,
  password: string,
  email: string,
  confirmPassword: string
}


const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<FormValues>();

  let redirect = useNavigate()

  const onSubmit = (data: FormValues) =>{
    redirect('/')
  }

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit((data)=>onSubmit(data))}>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContent sx={{paddingBottom: 0}}>
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
            sx={{
              marginTop: 2
            }}
          />
          <span className={s.form__error}>
            {errors.email && errors.email.message}
          </span>
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
            sx={{
              marginTop: 2
            }}
          />
          <span className={s.form__error}>
            {errors.fullName && errors.fullName.message}
          </span>
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
            sx={{
              marginTop: 2
            }}
          />
          <span className={s.form__error}>
            {errors.password && errors.password.message}
          </span>
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
            sx={{
              marginTop: 2
            }}
          />
          <span className={s.form__error}>
            {errors.confirmPassword && errors.confirmPassword.message}
          </span>
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