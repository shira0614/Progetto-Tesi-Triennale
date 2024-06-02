import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function ReplicaCard(props) {
    return (
        <Card variant='outlined' sx={{
            display: 'flex',
            mb: '1rem',
            mt: '1rem',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent>
                    <Typography variant='h5'>{props.replicaUniqueId}</Typography>
                    <Typography fontWeight='bold'>Campioni:
                        <Typography display='inline'> {props.sample}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Note:
                        <Typography display='inline'> {props.notes}</Typography>
                    </Typography>
                </CardContent>
            </Box>
            {
                props.image ? <CardMedia
                    component="img"
                    alt="plant image"
                    height="140"
                    image = {props.image}
                /> : <Box className='leaf-mini' sx={{
                    minWidth: '40%', minHeight: '100%', ml: 8
                }}/>
            }
        </Card>
    )
}