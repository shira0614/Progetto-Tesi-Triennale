import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AddAnalysisDialogue from "./AddAnalysisDialogue.jsx";
import {useState} from "react";

export default function ReplicaCard(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <>
            <AddAnalysisDialogue open={open} setOpen={setOpen} replica={props.replica}/>
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
                <CardActions>
                    <Button size='small' color='forest' onClick={handleOpen}>Compila analisi</Button>
                </CardActions>
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
        </>
    )
}