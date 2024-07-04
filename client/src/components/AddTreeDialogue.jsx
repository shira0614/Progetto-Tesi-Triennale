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
import axios from 'axios'
import SuccessAlert from "./SuccessAlert.jsx";
import FailAlert from "./FailAlert.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from 'react';
import { useContext } from "react";
import {TreeContext} from "./context/TreeContext.jsx";

const BASE_URL = 'http://localhost:3000/api/'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTreeDialogue(props) {
    const [cultivar, setCultivar] = useState('Leccino');
    const [date, setDate] = useState(new Date());
    const [inoculated, setInoculated] = useState(true);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const formRef = useRef(null);
    const { treeList, setTreeList } = useContext(TreeContext);

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
        data.append('inoculated', inoculated);
        data.append('timestamp', date);
        data.append('cultivar', cultivar);

        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }

        if (data.get('image') && data.get('image').size) {
            const validTypes = ['image/png', 'image/jpeg'];

            if (!validTypes.includes(data.get('image').type)) {
                alert("Scegliere un'immagine con un formato .jpg o .png");
                return;
            }
        }

        axios.post(`${BASE_URL}trees/addTree`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if(response.data.success) {
                console.log(response.data);
                setTreeList([...treeList, response.data.tree]);
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
                PaperProps={{
                    component: 'form',
                    ref: formRef,
                    onSubmit: handleSubmit,
                    encType: 'multipart/form-data'
                }}
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
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100vw'}}>
                        <Typography variant='h6' sx={{ ml: 3, mt: 3}}>Compilare tutti i campi per una corretta catalogazione dell'albero</Typography>
                                <FormControl sx={{
                                    m: 5, display: 'flex', flexDirection: 'row',
                                    alignItems: 'stretch', flex: '1', flexWrap: 'wrap', gap: '3rem'
                                }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ mb: 2 }} variant='h6' color='text.secondary'>Specie</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                                <TextField
                                                    id="s-name"
                                                    label="Nome scientifico"
                                                    variant="outlined"
                                                    type='text'
                                                    name='specieNomeComune'
                                                />
                                                <TextField
                                                    id="c-name"
                                                    label="Nome comune"
                                                    variant="outlined"
                                                    type='text'
                                                    name='specieNomeScientifico'
                                                />
                                                <TextField
                                                    id="sub-s"
                                                    label="Sottospecie"
                                                    variant="outlined"
                                                    type='text'
                                                    name='sottospecie'
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
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ mb: 2 }} variant='h6' color='text.secondary'>Altre informazioni</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                            <TextField
                                                id="infection"
                                                label="Infezione"
                                                variant="outlined"
                                                type='text'
                                                name='infectionType'
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
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mt: 5 }}>
                                            <TextField
                                                id="notes"
                                                label="Note"
                                                type='text'
                                                variant="outlined"
                                                name='notes'
                                            />
                                            <TextField
                                                type="file"
                                                variant="outlined"
                                                margin="normal"
                                                name="image"
                                                helperText="Formati ammessi: .jpg, .png"
                                                label="Seleziona immagine"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </FormControl>
                    </Box>
            </Dialog>
        </>
)
}