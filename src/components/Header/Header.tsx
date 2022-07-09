import { Button, Modal, Typography, Box, Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import s from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectAuth } from "../../redux/authSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
}

const Header = () =>{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectAuth)

    const onClickLogout = () => {
        if(window.confirm('Вы действительно хотите выйти?')){
            dispatch(logout())
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" onClick={handleClose}>
            Clear cache
          </Typography>
          <Typography id="modal-modal-title" sx={{ mt: 2 }} onClick={handleClose}>
            Logging out
          </Typography>
        </Box>
      </Modal>
      </div>
      </Container>
    </section>)
}

export default Header