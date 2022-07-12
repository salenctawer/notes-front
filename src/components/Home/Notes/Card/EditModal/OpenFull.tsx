import React, { useState } from "react"
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import s from './OpenFull.module.scss'
import { CardProps } from "../Card";
import { useForm } from "react-hook-form";
import { AddNoteType } from "../../../../../types/types";
import { selectItems } from "../../../../Header/CreateNote/CreateNote";
import { useAppDispatch } from "../../../../../redux/hooks";
import { editNote } from "../../../../../redux/notesSlice";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const style ={
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}


const OpenFull: React.FC<CardProps> = (props) =>{
    const dispatch = useAppDispatch()
    
    const [disabled, setDisabled] = useState(true)
    
    let mydate:any = props.deadline;
    mydate = new Date(mydate.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
    const [date, setDate] = useState<Date | String | null>(mydate.toDateString());



    const {register, handleSubmit, setValue, formState: {errors}} = useForm<AddNoteType>({
        defaultValues:{
            title: props.title,
            text: props.text,
        }
    })



    const editCardClick = () =>{
        setDisabled(false)
    }

    const onSubmit = (values: AddNoteType) =>{
        values._id = props._id   
        values.deadline = "24.12.2022"   //доделать
        dispatch(editNote(values))
    }
    return(<div>
        <Box sx={style } className={s.box}>
        <div className={s.edit}> 
            <EditIcon onClick={editCardClick}/>
        </div>
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
                  disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                defaultValue={selectItems.filter(item => item.value == props.important)}
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
                        setDate(newValue)
                    }}
                    renderInput={(params) => <TextField {...params}/>}
                />
            </LocalizationProvider>
            <Button variant="contained"
                disabled={disabled}
                type='submit'
                sx={{
                marginTop: 2
                }}
                >
                    Изменить
            </Button>
          </form>
        </Box>
    </div>)
}

export default OpenFull