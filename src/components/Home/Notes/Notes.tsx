import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchNotes } from "../../../redux/notesSlice";
import s from './Notes.module.scss'



const Notes: React.FC = () =>{

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes.items)

    useEffect(()=>{
        dispatch(fetchNotes())
    }, [dispatch])

    return(<div className={s.notes}>
        <div className={s.cards}>

        </div>
    </div>)
}

export default Notes