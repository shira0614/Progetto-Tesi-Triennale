import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import { postApi } from "../utils/apiEndpoints.js";
import {useContext, useRef} from "react";
import NaturePeopleRoundedIcon from '@mui/icons-material/NaturePeopleRounded';
import {FormControl, MenuItem, Select, Chip, Stack} from "@mui/material";
import { AnalysisContext } from "./context/AnalysisContetx.jsx";
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from 'axios';

export default function CompleteDialogue({ isOpen, setOpen, ...props }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);
    const formRef = React.useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);

        data.append('analysisId', props.analysis._id);

        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }

        axios.post('http://localhost:3000/api/analysis/updateAnalysis', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            }
        }).then((response) => {
            if(response.data.success) {
                console.log(response.data);
                let updatedList = analysisList.map((analysis) => {
                    if(analysis._id === props.analysis._id) {
                        return {...analysis, status: 'completed'};
                    }
                    return analysis;
                });
                setAnalysisList(updatedList);
            }
        }).catch((e) => {
            console.log(e);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                ref: formRef,
                onSubmit: handleSubmit,
                encType: 'multipart/form-data'
            }}
        >
            <DialogTitle >
                {"Compila l'analisi"}
            </DialogTitle>
            <DialogContent>
                <Typography variant='h6'>{props.analysis.replica.replicaUniqueId}</Typography>
                <Stack direction='row' spacing={2} sx={{ mt: 2, mb: 2}}>
                    { /* TODO sistemare le icone delle chips */ }
                    <Chip icon={<NaturePeopleRoundedIcon />} label={props.analysis.replica.treeId.treeUniqueId} />
                    <Chip icon={<GrassRoundedIcon />} label={props.analysis.replica.treeId.cultivar} />
                    <Chip icon={<CoronavirusRoundedIcon />} label={props.analysis.replica.treeId.infectionType} />
                </Stack>
                <Typography variant='body1'>Questa analisi verrà restituita a:
                    &nbsp;
                    <Typography fontWeight='bold' display='inline'>{props.analysis.shipper.username}</Typography>
                </Typography>
                <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
                    <TextField
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="notes"
                        label="Note"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        type="file"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="image"
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
                        required
                        fullWidth
                        name="document"
                        helperText="Il documento è obbligatorio per l'invio dell'analisi"
                        label="Seleziona documento"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Invia
                    </Button>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
            </DialogActions>
        </Dialog>
    );
}

