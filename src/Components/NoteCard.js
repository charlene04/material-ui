import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography, Avatar} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { blue, green, pink } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if (note.category === 'work') return green[700]
            if (note.category === 'reminder') return pink[500]
            return blue[700]
        }
    }
})

function NoteCard({ item, deleteHandler }) {
    const classes = useStyle(item)
  return (
    <div>
        <Card elevation={1}>
              <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {item.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => deleteHandler(item.id)}>
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={item.title}
                subheader={item.category}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    { item.body }
                </Typography>
            </CardContent>
        </Card>  
    </div>
  )
}
export default NoteCard;
