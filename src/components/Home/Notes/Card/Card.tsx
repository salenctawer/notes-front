import React from "react"
import s from './Card.module.scss'
import { Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';


interface CardProps {
    title: String,
    _id: String,
    text: String,
    deadline: String,
    important: String
}

const Card: React.FC<CardProps> = (props) =>{
    return(<div className={s.card}>
        <div className={s.titleDeleteContainer}>
            <div className={s.title}>
                <Typography>{props.title}</Typography>
            </div>
            <div className={s.delete}>
            <DeleteOutlineIcon/>
            </div>
        </div>
        <div>
            <Typography>{props.important}</Typography>
        </div>
        <div>
            <Typography>{props.deadline}</Typography>
        </div>
        <div className={s.openFullContainer}>
            <Typography style={{marginRight: '10px'}}>
                Открыть полностью
            </Typography>
            <OpenInFullIcon />
        </div>
    </div>)
}

export default Card