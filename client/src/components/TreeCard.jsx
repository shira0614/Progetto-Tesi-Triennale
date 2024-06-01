import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function TreeCard(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${props._id}`);
    }

    return (
        <Card sx={{
            display: 'flex',
            border: '3px solid',
            borderColor: '#ffffff00',
            m: '1rem',
        }}>
            <CardActionArea onClick={handleClick}>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.treeUniqueId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.scifiName}, {props.commonName}, {props.subSpecie}
                        </Typography>
                        <Typography sx={{ mt: 1}}>Data di aggiunta: {props.date}</Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
            {
                props.image ? <CardMedia
                    component="img"
                    alt="plant image"
                    height="140"
                    image = {props.image}
                /> : <Box className='leaf-mini' sx={{
                    minWidth: '10vw', minHeight: '100%'
                }}/>
            }
        </Card>
    );
}