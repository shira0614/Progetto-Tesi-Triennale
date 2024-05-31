import React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Typography, TextField, Fab } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Calendar from "./Calendar.jsx";
import { useState } from 'react';
import Button from "@mui/material/Button";
import '../index.css';

export default function AddTree() {
    const [cultivar, setCultivar] = useState('LE');
    const [date, setDate] = useState(new Date());

    const handleChange = (event) => {
    setCultivar(event.target.value);
  };
    const handleDateChange = (date) => {
     setDate(date);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const body = {
            specieNomeScientifico: data.get('s-name'),
            specieNomeComune: data.get('c-name'),
            sottospecie: data.get('sub-s'),
            cultivar: data.get('Cultivar'),
            inoculated: data.get('inoculated'),
            infectionType: data.get('infection'),
            timestamp: date,
            notes: data.get('notes')
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <Typography variant='h3' sx={{ width: '100%', alignSelf: 'left', mt: 6, ml: 10}}>Aggiungi albero</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'stretch', flex: '1' }}>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', 
                alignItems: 'stretch', flex: '2', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <FormControl sx={{ m: '5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', 
                alignItems: 'stretch', flex: '1', flexWrap: 'wrap', gap: '3rem'
                }}>
                        <TextField id="s-name" label="Nome scientifico" variant="outlined" />
                        <TextField id="c-name" label="Nome comune" variant="outlined" />
                        <TextField id="sub-s" label="Sottospecie" variant="outlined" />
                        <TextField
                            id="Cultivar"
                            select
                            label="Cultivar"
                            defaultValue="LE"
                            value={cultivar}
                            onChange={handleChange}

                        >
                            <MenuItem value='LE' >Leccino</MenuItem>
                            <MenuItem value='FR' >Frantoio</MenuItem>
                            <MenuItem value='MO' >Moraiolo</MenuItem>
                        </TextField>
                        <TextField id="infection" label="Infezione" variant="outlined" />
                        <Box>
                        <FormLabel id="inoculated">Inoculazione</FormLabel>
                        <RadioGroup row
                                    defaultValue="true"
                                    name="radio-buttons-group"
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Si" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                        </Box>
                        <Calendar onDateChange={handleDateChange} />
                        <TextField id="notes" label="Note" variant="outlined" fullWidth />
                        <Button variant='contained' type='submit' sx={{
                            minWidth: '20vw'
                        }}>Aggiungi albero</Button>
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
};

