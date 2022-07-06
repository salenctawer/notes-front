import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../../redux/notesSlice";

const Notes = () =>{

    const dispatch = useDispatch()
    const {notes} = useSelector(state => state.notes)

    useEffect(()=>{
        dispatch(getNotes())
    }, [])

    return(<div>
        Notes
    </div>)
}

export default Notes