import { Button, Modal, Typography, Box, Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import s from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectAuth } from "../../redux/authSlice";
import CreatePost from "./CreateNote/CreateNote";



const Header = () =>{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectAuth)

    const onClickLogout = () => {
        if(window.confirm('Вы действительно хотите выйти?')){
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    };

    const redirect = useNavigate()

    return(<section className={s.header}>
        <Container maxWidth='lg'>
        <div className={s.container}>
        <Typography onClick={()=>redirect('/')}>
            Создание заметок
        </Typography>
        {
            isAuth? (
                <div className={s.buttons}>
                    <Button onClick={handleOpen}>
                        Создать заметку
                    </Button>
                    <Button onClick={onClickLogout} variant="contained" color="error">
                        Выйти
                    </Button>
                </div>
            ) : (
                <div className={s.buttons}>
                    <Button variant="outlined" onClick={()=>redirect('/login')}>Войти</Button>
                    <Button variant="contained" onClick={()=>redirect('/registration')}>Создать аккаунт</Button>
                </div>
            )
        }

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreatePost />
      </Modal>
      </div>
      </Container>
    </section>)
}

export default Header