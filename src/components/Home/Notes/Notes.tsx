import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUserNotes } from "../../../redux/notesSlice";
import s from './Notes.module.scss'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from "./Card/Card";



const Notes: React.FC = () =>{

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes.items)
    const status = useAppSelector(state => state.notes.notes.status)
    const id = useAppSelector(state => state.auth.data?._id)

    const isNotesLoading = status === 'loading'

    useEffect(()=>{
        dispatch(fetchUserNotes(id))
    }, [dispatch])

    return(<div className={s.notes}>
        <Box sx={{ width: '100%' }}></Box>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
            isNotesLoading? <div>Идет загрузка</div>: notes.map((obj, index)=>
              <Grid item xs={4} key={index}>
                <Card 
                    title={obj.title}
                    deadline={obj.deadline}
                    _id={obj._id}
                    text={obj.text}
                    important={obj.important}
                />
              </Grid>
            ) 
        }
        </Grid>

    </div>)
}

export default Notes