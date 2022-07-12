import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import s from './UserInfo.module.scss'


const styleText = {
    color: "#FFFFFF",
    fontFamily: 'roboto'
}

const UserInfo = () =>{

    const fullName = useAppSelector(state=>state.auth.data?.fullName)
    const email = useAppSelector(state=>state.auth.data?.email)

    return(<div className={s.userInfo}>
        <Typography>
            {fullName}
        </Typography>
        <Typography>
            {email}
        </Typography>
    </div>)
}

export default UserInfo