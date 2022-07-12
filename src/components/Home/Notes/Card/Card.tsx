import React from "react"
import s from './Card.module.scss'
import { Button, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "../../../../redux/hooks";
import { removeNote } from "../../../../redux/notesSlice";
import OpenFull from "./EditModal/OpenFull";
import '@fontsource/roboto/400.css';


export interface CardProps {
    title: String,
    _id: String,
    text: String,
    deadline: String,
    important: String
}

const styleText = {
    color: "#FFFFFF",
    fontFamily: 'roboto'
}

const Card: React.FC<CardProps> = (props) =>{
    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch()

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const removeCardClick = () =>{
        dispatch(removeNote(props._id))
    }
    const editCardClick = () =>{

    }
    return(
        <div >
            <div className={s.card}>
        <div className={s.titleDeleteContainer}>
            <div className={s.title}>
                <Typography style={styleText}>{props.title}</Typography>
            </div>
            <div className={s.delete}>
            <DeleteOutlineIcon onClick={removeCardClick}/>
            </div>
        </div>
        <div>
            <Typography style={styleText}>{props.important}</Typography>
        </div>
        <div>
            <Typography style={styleText}>{props.deadline}</Typography>
        </div>
        <div className={s.openFullContainer} onClick={handleOpen}>
            <Typography style={{marginRight: '10px'}}>
                Открыть полностью
            </Typography>
            <OpenInFullIcon />
        </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
      >
        <OpenFull {...props} handleClose={handleClose}/>
      </Modal>
    </div>
    )
}

export default Card