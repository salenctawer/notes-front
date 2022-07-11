import React, { useState } from "react"
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import s from './OpenFull.module.scss'
import { CardProps } from "../Card";
import { useForm } from "react-hook-form";
import { AddNoteType } from "../../../../../types/types";
import { selectItems } from "../../../../Header/CreateNote/CreateNote";

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
    
    const [disabled, setDisabled] = useState(true)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<AddNoteType>({
        defaultValues:{
            title: props.title,
            text: props.text,
            important: props.important,
        }
    })

    const editCardClick = () =>{
        setDisabled(false)
    }

    const onSubmit = (values: AddNoteType) =>{
        console.log(values)
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
                >
                {selectItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
            <Button type='submit'/>
          </form>
        </Box>
    </div>)
}

export default OpenFull