import React from "react"
import s from './Card.module.scss'


interface CardProps {
    title: String,
    _id: String,
    text: String,
    deadline: String
}

const Card: React.FC<CardProps> = (props) =>{
    return(<div className={s.card}>
        
    </div>)
}

export default Card