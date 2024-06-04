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

export default function CompleteDialogue({ isOpen, setOpen, ...props }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);
    const formRef = React.useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);

        console.log('Document file:', data.get('document'));

        data.append('analysisId', props.analysis._id);
        data.append('image', data.get('image'));
        data.append('notes', data.get('notes'));

        console.log('Body', data)

        postApi('analysis/updateAnalysis', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if(response.success) {
                console.log(response);
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        sx={{ mb: 3 }}
                    >
                        Carica immagine
                    </Button>

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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Carica documento
                    </Button>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleSubmit} color='forest' sx={{ color: '#ffffff' }} autoFocus>
                    Invia
                </Button>
                <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
            </DialogActions>
        </Dialog>
    );
}

