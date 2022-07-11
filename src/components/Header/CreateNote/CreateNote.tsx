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


const selectItems = [
    {
        value: 'Очень важно'
    },
    {
        value:'Важно'
    },
    {
        value:'Средне'
    },
    {
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

    const [date, setDate] = useState<Date | null>(null);

    const dispatch = useAppDispatch()



    const getFinalDate = () =>{           //переделать
        let day: any = date?.getDate()            
        let year: any = date?.getFullYear()
        let month:any = date? date.getMonth() + 1 : 0

        if(day <= 9){
            day = `0${day}`
        }
        if(month <= 9){
            month = `0${month}`
        }

        let finalDate = `${day}.${month}.${year}`
        return finalDate 
    }


    const onSubmit = (values:AddNoteType ) =>{
        let date =  getFinalDate()
        values.deadline = date
        dispatch(addNote(values))
        console.log(values)
        
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
                    <MenuItem key={option.value} value={option.value}>
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
                        setDate(newValue);
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