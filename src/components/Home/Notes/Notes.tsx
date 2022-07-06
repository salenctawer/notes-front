import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchNotes } from "../../../redux/notesSlice";



const Notes: React.FC = () =>{

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes.items)

    useEffect(()=>{
        dispatch(fetchNotes())
    }, [])

    return(<div>
        Notes
    </div>)
}

export default Notes