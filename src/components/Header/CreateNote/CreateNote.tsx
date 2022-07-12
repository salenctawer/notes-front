import React, { useState } from "react";
import {Box, Button, TextField} from "@mui/material";
import s from './CreateNote.module.scss'
import { useForm } from 'react-hook-form';
import { AddNoteType } from "../../../types/types";
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAppDispatch } from "../../../redux/hooks";
import { addNote } from "../../../redux/notesSlice";
import dateFormat, { masks } from "dateformat";


export const selectItems = [
    {
        key: 1,
        value: 'Очень важно'
    },
    {
        key: 2,
        value:'Важно'
    },
    {
        key: 3,
        value:'Средне'
    },
    {
        key: 4,
        value:'Не очень важно'
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const CreatePost = () =>{

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<AddNoteType>()


    const [date, setDate] = useState<any>(dateFormat(new Date()));   //типизировать

    const dispatch = useAppDispatch()
    
    

    const onSubmit = (values:AddNoteType ) =>{
        let finalDate = dateFormat(date, 'dd.mm.yyyy')
        values.deadline = finalDate
        dispatch(addNote(values))
        
    }

    return(<Box sx={style}>
        <form onSubmit={handleSubmit((values)=>onSubmit(values))}>
          <TextField
              {...register("title", {
                required: {
                  value: true,
                  message: "Это поле обязательно",
                },
              })}
              autoFocus
              margin="dense"
              id="title"
              label="Название заметки"
              type="text"
              fullWidth
              variant="standard"
              error={Boolean(errors.title?.message)}
              helperText={errors.title?.message}
            />
            <TextField
                {...register("text", {
                    required: {
                    value: true,
                    message: "Это поле обязательно",
                    },
                })}
                margin="dense"
                id="text"
                label="Текст заметки"
                fullWidth
                multiline
                variant="standard"
            />
             <TextField
                {...register("important", {
                    required: {
                    value: true,
                    message: "Это поле обязательно",
                    },
                })}
                id="important"
                select
                label="Важность"
                style={{width: 125}}
                >
                {selectItems.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                    {option.value}
                    </MenuItem>
                ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Дедлайн"
                    value={date}
                    inputFormat = 'dd/MM/yyyy'
                    mask="__/__/____"
                    onChange={(newValue) => {
                        setDate(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
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
    </Box>)
}

export default CreatePost