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
import dateFormat from "dateformat";

const style ={
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px',
    background: 'radial-gradient(#76b2fe, #b69efe)'
}

 interface OpenFullCardType extends CardProps {
    handleClose: () => void
 }


const OpenFull: React.FC<OpenFullCardType> = (props) =>{
    const dispatch = useAppDispatch()
    
    const [disabled, setDisabled] = useState(true)
    
    let mydate:any = props.deadline;
    mydate = new Date(mydate.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
    const [date, setDate] = useState<any>(mydate.toDateString());  //типизировать

    let selectDefaultItem = selectItems.find(item => item.value == props.important)


    const {register, handleSubmit, setValue, formState: {errors}} = useForm<AddNoteType>({
        defaultValues:{
            title: props.title,
            text: props.text
        }
    })




    const editCardClick = () =>{
        setDisabled(false)
    }

    const onSubmit = (values: AddNoteType) =>{
        values._id = props._id   
        let finalDate = dateFormat(date, 'dd.mm.yyyy')
        values.deadline = finalDate
        console.log(values)
        dispatch(editNote(values))
        props.handleClose()
    }
    return(<div>
        <Box sx={style }>
        <div className={s.edit}> 
            <EditIcon onClick={editCardClick}/>
        </div>
          <form onSubmit={handleSubmit((values)=>onSubmit(values))} className={s.form}>
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
                style={{width: 125, marginBottom:20, marginTop: 20}}
                disabled={disabled}
                defaultValue={selectDefaultItem?.value}
                >
                {selectItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    disabled={disabled}
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
                marginTop: 5,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: 200
                }}
                >
                    Изменить
            </Button>
          </form>
        </Box>
    </div>)
}

export default OpenFull