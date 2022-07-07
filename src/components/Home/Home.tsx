import { Typography } from "@mui/material"
import Notes from "./Notes/Notes"
import UserInfo from "./UserInfo/UserInfo"


const Home = () =>{

    const isAuth = true

    return(<div>
        {
            isAuth? (
                <div>
                    <UserInfo />
                    <Notes />
                </div>
            ) : (
                <Typography>Для просмотра заметок войдите в аккаунт или зарегестрируйтесь</Typography>
            )
        }
    </div>)
}

export default Home