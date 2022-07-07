import React from "react"
import s from './Card.module.scss'
import { Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


interface CardProps {
    title: String,
    _id: String,
    text: String,
    deadline: String,
    important: String
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const Card: React.FC<CardProps> = (props) =>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <div>
            <div className={s.card}>
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
        <div className={s.openFullContainer} onClick={handleOpen}>
            <Typography style={{marginRight: '10px'}}>
                Открыть полностью
            </Typography>
            <OpenInFullIcon />
        </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            {props.title}
          </p>
        </Box>
      </Modal>
    </div>
    )
}

export default Card