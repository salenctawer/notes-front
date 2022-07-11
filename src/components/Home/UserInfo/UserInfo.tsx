import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

const UserInfo = () =>{

    const fullName = useAppSelector(state=>state.auth.data?.fullName)
    const email = useAppSelector(state=>state.auth.data?.email)

    return(<div>
        <Typography>
            {fullName}
        </Typography>
        <Typography>
            {email}
        </Typography>
    </div>)
}

export default UserInfo