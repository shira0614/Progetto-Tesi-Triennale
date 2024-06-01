import React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Typography, TextField, Fab } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Calendar from "./Calendar.jsx";
import { useState } from 'react';
import Button from "@mui/material/Button";
import '../index.css';
import { postApi } from "../utils/apiEndpoints.js";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AddTree() {
    const [cultivar, setCultivar] = useState('Leccino');
    const [date, setDate] = useState(new Date());
    const [specieNomeScientifico, setSpecieNomeScientifico] = useState('');
    const [specieNomeComune, setSpecieNomeComune] = useState('');
    const [sottospecie, setSottospecie] = useState('');
    const [infectionType, setInfectionType] = useState('');
    const [inoculated, setInoculated] = useState(true);
    const [notes, setNotes] = useState('');
    const [openSuccess, setOpenSuccess] = React.useState(false);

    //TODO aggiungere alert in caso di fail
    const navigate = useNavigate();

    const handleChange = (event) => {
    setCultivar(event.target.value);
  };
    const handleDateChange = (date) => {
     setDate(date);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
        });
    }

    return (
        <>
            {/*TODO aggiustare in caso di responsive */}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <Typography variant='h3' sx={{ width: '100%', alignSelf: 'left', mt: 6, ml: 10}}>Aggiungi albero</Typography>
                <Collapse in={openSuccess}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenSuccess(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ maxWidth: '50vw', ml: 10, mt: 3, mb: 3 }}
                    >
                        L'albero è stato aggiunto con successo
                    </Alert>
                </Collapse>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'stretch', flex: '1' }}>
                <Box component='form' onSubmit={handleSubmit}
                     onKeyDown={(event) => {
                         if (event.key === 'Enter') {
                             event.preventDefault();
                         }
                     }}
                     sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
                alignItems: 'stretch', flex: '2', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <FormControl sx={{ m: '5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', 
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
                            <MenuItem value='Leccino' >Leccino</MenuItem>
                            <MenuItem value='Frantoio' >Frantoio</MenuItem>
                            <MenuItem value='Moraiolo' >Moraiolo</MenuItem>
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
                                <FormControlLabel value="true" control={<Radio />} label="Si" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </Box>
                        <Calendar onDateChange={handleDateChange} />
                        <TextField
                            id="notes"
                            label="Note"
                            variant="outlined"
                            fullWidth
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Button variant='contained'
                                type='submit'
                                sx={{
                            minWidth: '20vw'
                        }}>Aggiungi albero
                        </Button>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: '1', mb: '5rem' }}>
                    <Box className='leaf-mini' sx={{
                    minWidth: '20vw', minHeight: '20vh', m: '1rem', borderRadius: '10px'
                }}/>
                    <Button variant="outlined" sx={{ mb: 1}}>
                        Aggiungi immagine
                        <input type="file" hidden />
                    </Button>
                </Box>
                </Box>
            </Box>
        </>
    );
}

