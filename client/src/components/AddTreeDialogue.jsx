import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Typography, TextField, Fab } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Calendar from "./Calendar.jsx";
import { useState, useRef } from 'react';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import '../index.css';
import { postApi } from "../utils/apiEndpoints.js";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "./SuccessAlert.jsx";
import FailAlert from "./FailAlert.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTreeDialogue(props) {
    const [cultivar, setCultivar] = useState('Leccino');
    const [date, setDate] = useState(new Date());
    const [specieNomeScientifico, setSpecieNomeScientifico] = useState('');
    const [specieNomeComune, setSpecieNomeComune] = useState('');
    const [sottospecie, setSottospecie] = useState('');
    const [infectionType, setInfectionType] = useState('');
    const [inoculated, setInoculated] = useState(true);
    const [notes, setNotes] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const formRef = useRef(null);

    //TODO aggiustare il form

    const handleChange = (event) => {
    setCultivar(event.target.value);
  };
    const handleDateChange = (date) => {
     setDate(date);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        const body = {
            specieNomeScientifico: specieNomeScientifico,
            specieNomeComune: specieNomeComune,
            sottospecie: sottospecie,
            cultivar: cultivar,
            inoculated: inoculated,
            infectionType: infectionType,
            timestamp: date,
            notes: notes
        };
        console.log(body)
        postApi('trees/addTree', body).then((response) => {
            console.log(response);
            if(response.success) {
                setOpenSuccess(true);
            }
        }).catch((e) => {
            console.log(e);
            setOpenFail(true);
        });
    }

    return (
        <>
            <FailAlert open={openFail} setOpen={setOpenFail} message={"Non è stato possibile aggiungere l'albero correttamente. Riprovare"}></FailAlert>
            <SuccessAlert open={openSuccess} setOpen={setOpenSuccess} message={'Albero creato con successo'}/>
            {/*TODO aggiustare in caso di responsive */}
            <Dialog
                fullScreen
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Nuovo albero
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            Aggiungi
                        </Button>
                    </Toolbar>
                </AppBar>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh'}}>
                        <Typography variant='h6' sx={{ ml: 3, mt: 3}}>Compilare tutti i campi per una corretta catalogazione dell'albero</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'space-around',
                            alignItems: 'stretch',
                            flex: '1'
                        }}>
                            <Box
                                 onKeyDown={(event) => {
                                     if (event.key === 'Enter') {
                                         event.preventDefault();
                                     }
                                 }}
                                 sx={{
                                     display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
                                     alignItems: 'stretch', flex: '2', flexWrap: 'wrap', gap: '1rem'
                                 }}>
                                <FormControl sx={{
                                    m: '5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center',
                                    alignItems: 'stretch', flex: '1', flexWrap: 'wrap', gap: '3rem'
                                }}>
                                    <TextField
                                        id="s-name"
                                        label="Nome scientifico"
                                        variant="outlined"
                                        value={specieNomeScientifico}
                                        onChange={(e) => setSpecieNomeScientifico(e.target.value)}
                                    />
                                    <TextField
                                        id="c-name"
                                        label="Nome comune"
                                        variant="outlined"
                                        value={specieNomeComune}
                                        onChange={(e) => setSpecieNomeComune(e.target.value)}
                                    />
                                    <TextField
                                        id="sub-s"
                                        label="Sottospecie"
                                        variant="outlined"
                                        value={sottospecie}
                                        onChange={(e) => setSottospecie(e.target.value)}
                                    />
                                    <TextField
                                        id="cultivar"
                                        select
                                        label="Cultivar"
                                        defaultValue="LE"
                                        value={cultivar}
                                        onChange={handleChange}

                                    >
                                        <MenuItem value='Leccino'>Leccino</MenuItem>
                                        <MenuItem value='Frantoio'>Frantoio</MenuItem>
                                        <MenuItem value='Moraiolo'>Moraiolo</MenuItem>
                                    </TextField>
                                    <TextField
                                        id="infection"
                                        label="Infezione"
                                        variant="outlined"
                                        value={infectionType}
                                        onChange={(e) => setInfectionType(e.target.value)}
                                    />
                                    <Box>
                                        <FormLabel id="inoculated">Inoculazione</FormLabel>
                                        <RadioGroup row
                                                    defaultValue="true"
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setInoculated(e.target.value)}
                                        >
                                            <FormControlLabel value="true" control={<Radio/>} label="Si"/>
                                            <FormControlLabel value="false" control={<Radio/>} label="No"/>
                                        </RadioGroup>
                                    </Box>
                                    <Calendar onDateChange={handleDateChange}/>
                                    <TextField
                                        id="notes"
                                        label="Note"
                                        variant="outlined"
                                        fullWidth
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: '1',
                                mb: '5rem'
                            }}>
                                <Box className='leaf-mini' sx={{
                                    minWidth: '20vw', minHeight: '20vh', m: '1rem', borderRadius: '10px'
                                }}/>
                                <Button variant="outlined" sx={{mb: 1}}>
                                    Aggiungi immagine
                                    <input type="file" hidden/>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Dialog>
        </>
)
}