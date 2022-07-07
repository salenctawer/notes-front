import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchNotes } from "../../../redux/notesSlice";
import s from './Notes.module.scss'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from "./Card/Card";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Notes: React.FC = () =>{

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes.items)
    const status = useAppSelector(state => state.notes.notes.status)

    const isNotesLoading = status === 'loading'

    useEffect(()=>{
        dispatch(fetchNotes())
    }, [dispatch])

    return(<div className={s.notes}>
        {
            isNotesLoading? <div>Идет загрузка</div>: notes.map((obj, index)=>
            <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Card 
                    title={obj.title}
                    deadline={obj.deadline}
                    _id={obj._id}
                    text={obj.text}
                
                />
              </Grid>
            </Grid>
          </Box>
            ) 
        }

    </div>)
}

export default Notes