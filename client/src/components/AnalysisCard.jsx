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
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import AcceptDialog from "./AcceptDialogue.jsx";
import RejectDialog from "./RejectDialogue.jsx";
import CompleteDialogue from "./CompleteDialogue.jsx";
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import {badgeAnalyses} from "../utils/analysisUtils.js";
import {AnalysisContext} from "./context/AnalysisContetx.jsx";

const BASE_URL = 'http://localhost:3000/api/'

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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 3,
        padding: '0 4px',
    },
}));

export function HomeAnalysisCard(props) {
    const [expanded, setExpanded] = useState(false);
    const [openUpload, setOpenUpload] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleOpenUpload = () => { setOpenUpload(true) }
    return (
        <>
            <CompleteDialogue setOpen={setOpenUpload} isOpen={openUpload} analysis={props.analysis}/>
                <Card sx={{
                    display: 'flex',
                    border: '3px solid',
                    borderColor: '#ffffff00',
                    m: '1rem',
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant='h5' gutterBottom >
                                    {props.analysis.replica.replicaUniqueId}
                                </Typography>
                                <Typography>
                                    Inviata da: {props.analysis.shipper.username}
                                </Typography>
                                <Typography variant="body1">
                                    ID: {props.analysis.protocolId}
                                </Typography>
                                &nbsp;
                                <Typography variant="body1" color="text.secondary">
                                    Status: Accettata
                                </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleOpenUpload} sx={{ color: '#2E644A' }}>Compila</Button>
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
                                <Typography variant='h6' display='block'>Dettagli</Typography>
                                <Typography variant='h7'>Pianta madre: {props.analysis.replica.treeId.treeUniqueId}</Typography>
                                &nbsp;
                                <Typography variant='body2' color="text.secondary" display='inline'>{props.analysis.replica.treeId.sottospecie}, {props.analysis.replica.treeId.cultivar}</Typography>
                                <Typography variant='h7' display='block'>Inoculazione: {props.analysis.replica.treeId.inoculated? 'Si' : 'No'}</Typography>
                                <Typography variant='h7' display='block'>Infezione: {props.analysis.replica.treeId.infectionType}</Typography>
                                <Typography variant='h7'>Note: </Typography>
                                <Typography variant='body1'>{props.analysis.notes ? props.analysis.notes : 'Nessuna'}</Typography>
                            </CardContent>
                        </Collapse>
                    </Box>
                        {
                            props.analysis.imageUrl ? <CardMedia
                                component="img"
                                alt="plant image"
                                objectFit='contain'
                                sx={{ display: 'flex', width: 250, flex: '0 1', alignItems: 'flex-end', ml: 3 }}
                                image = {props.analysis.imageUrl}
                            /> : <Box className='leaf-mini' sx={{
                                minWidth: 250, minHeight: '100%', ml: 3
                            }}/>
                        }
                </Card>
        </>
    );
}

export function NewAnalysisCard(props) {
    const [ openAccept, setOpenAccept ] = useState(false)
    const [ openReject, setOpenReject] = useState(false)

    const handleOpenAccept = () => {setOpenAccept(true)}
    const handleOpenReject = () => {setOpenReject(true)}

    return (
        <>
        <AcceptDialog setOpen={setOpenAccept} isOpen={openAccept} id={props._id} protocolId={props.protocolId}/>
        <RejectDialog setOpen={setOpenReject} isOpen={openReject} id={props._id}/>
            <Card sx={{
                display: 'flex',
                border: '3px solid',
                borderColor: '#ffffff00',
                m: '1rem',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column',
                    width: '100%', flex: '1 0', alignItems: 'flex-center', justifyContent: 'flex-start'}}>                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        Inviata da: {props.shipper.username}
                    </Typography>
                    <Typography variant="body1">
                        ID: {props.protocolId}
                    </Typography>
                    &nbsp;
                    <Typography color="text.secondary">
                        Status: In attesa di riscontro
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>Dettagli</Typography>
                    <Typography variant='h7'>Pianta madre: {props.replica.treeId.treeUniqueId}</Typography>
                    &nbsp;
                    <Typography variant='body2' color="text.secondary" display='inline'>{props.replica.treeId.sottospecie}, {props.replica.treeId.cultivar}</Typography>
                    <Typography variant='h7' display='block'>Inoculazione: {props.replica.treeId.inoculated? 'Si' : 'No'}</Typography>
                    <Typography variant='h7' display='block'>Infezione: {props.replica.treeId.infectionType}</Typography>
                    <Typography variant='h7'>Note: </Typography>
                    <Typography variant='body1'>{props.notes ? props.notes : 'Nessuna'}</Typography>
                </CardContent>
                <CardActions>
                    <Button sx={{ color: '#2E644A'}} onClick={handleOpenAccept}>Accetta</Button>
                    <Button sx={{ color: '#d32727'}} onClick={handleOpenReject}>Rifiuta</Button>
                </CardActions>
                </Box>
                {
                    props.image ? <CardMedia
                        component="img"
                        alt="plant image"
                        objectFit='contain'
                        sx={{ display: 'flex', width: 250, flex: '0 1', alignItems: 'flex-end', ml: 3 }}
                        image = {props.image}
                    /> : <Box className='leaf-mini' sx={{
                        minWidth: 250, minHeight: '100%', ml: 3
                    }}/>
                }
            </Card>
        </>
    );
}

export function ColtAnalysisCard(props) {
    return (
        <Card sx={{
            display: 'flex',
            border: '3px solid',
            borderColor: '#ffffff00',
            m: '1rem',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column',
                width: '100%', flex: '1 0', alignItems: 'flex-center', justifyContent: 'flex-start'}}>
                <CardContent sx={{ flex: '1' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.analysis.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        Destinatario: {props.analysis.laboratory.username}
                    </Typography>
                    <Typography variant="body1">
                        ID: {props.analysis.protocolId}
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>
                        Status:
                    </Typography>
                    <Typography>
                        {props.analysis.status === 'shipped' ? "L'analisi è in attesa di riscontro \n da parte del laboratorio"
                        : props.analysis.status === 'accepted' ? "L'analisi è stata accettata dal laboratorio"
                                :"L'analisi è stata rifiutata dal laboratorio"}
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>Dettagli analisi</Typography>
                    <Typography fontWeight='bold'>Note:
                        <Typography variant='body1'>{props.analysis.notes ? props.analysis.notes : 'Nessuna'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Documenti:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.document ? props.analysis.document : 'Nessuno'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Campioni:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.replica.sample}</Typography>
                    </Typography>
                </CardContent>
            </Box>
            {
                props.analysis.imageUrl ? <CardMedia
                    component="img"
                    alt="plant image"
                    objectFit='contain'
                    sx={{ display: 'flex', width: 200, flex: '0 1', alignItems: 'flex-end', ml: 2 }}
                    image = {props.analysis.imageUrl}
                /> : <Box className='leaf-mini'sx={{
                    minWidth: 200, minHeight: '100%', backgroundPosition: '20px 0'
                }}/>
            }
        </Card>
    )
}

export function CompletedAnalysis(props) {
    const [downloaded, setDownloaded] = useState(props.analysis.downloaded);
    const { badgeCounter, setBadgeCounter, analysisList , setAnalysisList } = useContext(AnalysisContext);

    const handleDownload = async () => {
        try {
            const response = await axios.get(`${BASE_URL}analysis/download/${props.analysis._id}`, {
                responseType: 'blob',
                withCredentials: true
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const filename = props.analysis.protocolId ? `analysis_${props.analysis.protocolId}.zip` : `analysis_${props.analysis._id}.zip`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            //Questo non è necessario per l'analisi in sé ma per l'update di badgeCounter
            const updatedAnalysisList = analysisList.map(analysis => {
                if (analysis._id === props.analysis._id) {
                    return { ...analysis, downloaded: true };
                }
                return analysis;
            });
            setAnalysisList(updatedAnalysisList);
            setBadgeCounter(badgeAnalyses(updatedAnalysisList).length);
            setDownloaded(true)

        } catch (error) {
            console.error('Error downloading the analysis:', error);
        }
    };

    return (
        <Card sx={{
            display: 'flex',
            border: '3px solid',
            borderColor: '#ffffff00',
            m: '1rem'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column',
                width: '100%', flex: '1 0', alignItems: 'flex-center', justifyContent: 'flex-start'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.analysis.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        Mittente: {props.analysis.laboratory.username}
                    </Typography>
                    <Typography variant="body1">
                        ID: {props.analysis.protocolId}
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>
                        Status:
                    </Typography>
                    <Typography>
                       L'analisi è stata completata
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>Dettagli analisi</Typography>
                    <Typography fontWeight='bold'>Note:
                        <Typography variant='body1'>{props.analysis.notes ? props.analysis.notes : 'Nessuna'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Allegati:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.documents ? 'Si' : 'Nessuno'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Campioni:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.replica.sample}</Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='forest' onClick={handleDownload}>
                        {
                            downloaded ?
                                <GetAppRoundedIcon sx={{ mr: 1 }}/> :
                                <StyledBadge variant='dot' color='error' sx={{ mr: 1 }}>
                                    <GetAppRoundedIcon />
                                </StyledBadge>
                        }
                        Scarica analisi
                    </Button>
                </CardActions>
            </Box>
            {
                props.analysis.imageUrl ? <CardMedia
                    component="img"
                    alt="plant image"
                    objectFit='contain'
                    sx={{ display: 'flex', width: 200, flex: '0 1', alignItems: 'flex-end', ml: 5 }}
                    image = {props.analysis.imageUrl}
                /> : <Box className='leaf-mini'sx={{
                    minWidth: 200, minHeight: '100%', backgroundPosition: '20px 0', ml: 5
                }}/>
            }
        </Card>
    )
}