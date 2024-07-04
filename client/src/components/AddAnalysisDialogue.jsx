import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LabSelect from "./LabSelect.jsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import {useState, useRef} from "react";
import axios from 'axios'
import { postApi } from "../utils/apiEndpoints.js";
import TextField from "@mui/material/TextField";
import SuccessAlert from "./SuccessAlert.jsx";
import FailAlert from "./FailAlert.jsx";

const BASE_URL = 'http://localhost:3000/api/'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const labsValue = Object.freeze({
    'Laboratorio 1': 'LAB1',
    'Laboratorio 2': 'LAB2',
    'Laboratorio 3': 'LAB3',
    'Laboratorio 4': 'LAB4',
    'Laboratorio 5': 'LAB5',
})

export default function AddAnalysisDialogue(props) {
    const [labs, setLabs] = useState([]);
    const [openFail, setOpenFail] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const formRef = useRef(null);

    const handleClose = () => {
        props.setOpen(false);
    };

    const onChangeLabs = (labs) => {
        setLabs(labs)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        labs.forEach((lab) => {
            const body = {
                labUsername: labsValue[lab],
                notes: data.get('notes'),
                replicaId: props.replica._id,
                image: data.get('image'),
                document: data.get('document')
            };

            if (data.get('image') && data.get('image').size !== 0) {
                const validTypes = ['image/png', 'image/jpeg'];

                if (!validTypes.includes(data.get('image').type)) {
                    alert("Scegliere un'immagine con un formato .jpg o .png");
                    return;
                }
            }

            axios.post(`${BASE_URL}analysis/newAnalysis`, body, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if(response.data.success) {
                    console.log(response.data);
                    setOpenSuccess(true);
                }
            }).catch((e) => {
                console.log(e);
                setOpenFail(true);
            });
        })
    }
    return (
        <>
            <FailAlert open={openFail} setOpen={setOpenFail} message={'Le analisi non sono state inviate correttamente. Riprovare.'}/>
            <SuccessAlert open={openSuccess} setOpen={setOpenSuccess} message={'Le analisi sono state inviate con successo.'}/>
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
                            Compila analisi
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            invia
                        </Button>
                    </Toolbar>
                </AppBar>
                    <Box sx={{mt: 3, ml: 3}}>
                        <Typography variant='h5'>Richiesta di analisi per la
                            replica: {props.replica.replicaUniqueId}
                        </Typography>
                        &nbsp;
                        <Typography fontWeight='bold'>Pianta madre:
                            <Typography display='inline'> {props.replica.treeId.treeUniqueId}</Typography>
                        </Typography>
                        <Typography fontWeight='bold'>Infezione:
                            <Typography display='inline'> {props.replica.treeId.infectionType}</Typography>
                        </Typography>
                        &nbsp;
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: 5}}>
                            <LabSelect onChangeLabs={onChangeLabs}/>
                            <TextField
                                margin="dense"
                                id="notes"
                                name="notes"
                                label="Note"
                                sx={{mt: 3}}
                            />
                        </Box>
                        <Box sx={{display: 'flex', mt: 3, flexDirection: 'column', alignItems: 'flex-start'}}>
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
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                type="file"
                                variant="outlined"
                                margin="normal"
                                name="document"
                                label="Seleziona documento"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ mb: 3 }}
                            />
                        </Box>
                    </Box>
            </Dialog>
        </>
    );
}