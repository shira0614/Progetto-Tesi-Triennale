import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../index.css'
import AcceptDialog from "./AcceptDialogue.jsx";
import RejectDialog from "./RejectDialogue.jsx";
import { useState } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export function HomeAnalysisCard(props) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <Box sx={{ minWidth: 275, m: '1rem' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        {props.replica.replicaUniqueId}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.shipper.username}
                    </Typography>
                    <Typography variant="body2">
                        Status: {props.status}
                    </Typography>
                    <Box>
                        {
                            props.image? <CardMedia
                                component="img"
                                alt="plant image"
                                height="140"
                                // image= ''
                            /> : <div className='leaf'/>
                        }
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Modifica</Button>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography variant='h6'>Dettagli</Typography>
                    <Typography paragraph>qui i dati sulla replica</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
}

export function NewAnalysisCard(props) {
    const [ openAccept, setOpenAccept ] = useState(false)
    const [ openDelete, setOpenDelete] = useState(false)

    const handleOpenAccept = () => {setOpenAccept(true)}
    const handleOpenDelete = () => {setOpenDelete(true)}

    return (
        <>
        <AcceptDialog setOpen={setOpenAccept} isOpen={openAccept} id={props._id}/>
        <RejectDialog setOpen={setOpenDelete} isOpen={openDelete} id={props._id}/>
        <Box sx={{ minWidth: '30vw', m: '1rem' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        {props.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        {props.shipper.username}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Status: {props.status}
                    </Typography>
                    <Typography variant='h6'>Dettagli</Typography>
                    <Typography variant='h7'>Pianta madre: {props.replica.treeId.treeUniqueId}</Typography>
                    &nbsp;
                    <Typography variant='body2' color="text.secondary" display='inline'>{props.replica.treeId.sottospecie}, {props.replica.treeId.cultivar}</Typography>
                    <Typography variant='h7' display='block'>Inoculazione: {props.replica.treeId.inoculated? 'Si' : 'No'}</Typography>
                    <Typography variant='h7' display='block'>Infezione: {props.replica.treeId.infectionType}</Typography>
                    <Typography variant='h7'>Note: </Typography>
                    <Typography variant='body1'>{props.notes ? props.notes : 'Nessuna'}</Typography>
                    <Box>
                        {
                            props.image? <CardMedia
                                component="img"
                                alt="plant image"
                                height="140"
                                // image= ''
                            /> : <div className='leaf'/>
                        }
                    </Box>
                </CardContent>
                <CardActions>
                    <Button sx={{ color: '#2E644A'}} onClick={handleOpenAccept}>Accetta</Button>
                    <Button sx={{ color: '#d32727'}} onClick={handleOpenDelete}>Rifiuta</Button>
                </CardActions>
            </Card>
        </Box>
        </>
    );
}