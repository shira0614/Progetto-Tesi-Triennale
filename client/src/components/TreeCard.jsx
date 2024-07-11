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
            width: { xs: '90vw', sm: '50vw' },
            minHeight: 100,
        }}>
            <CardActionArea onClick={handleClick}>
                <Box sx={{ display: 'flex', flexDirection: 'column',
                    width: '100%', flex: '1 0', alignItems: 'flex-center', justifyContent: 'flex-start'}}>
                    <CardContent sx={{ flex: '1' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.treeUniqueId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.scifiName}, {props.commonName}, {props.subSpecie}
                        </Typography>
                        <Typography sx={{ mt: 1}}>Data di nascita: {props.date}</Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
            {
                props.image ? <CardMedia
                    component="img"
                    alt="plant image"
                    objectFit='contain'
                    sx={{ display: 'flex', width: 250, flex: '0 1', alignItems: 'flex-end' }}
                    image = {props.image}
                /> : <Box className='leaf-mini' sx={{
                    minWidth: 250, minHeight: '100%'
                }}/>
            }
        </Card>
    );
}