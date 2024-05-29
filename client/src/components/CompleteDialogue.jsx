import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import { postApi } from "../utils/apiEndpoints.js";
import {useContext, useState} from "react";
import NaturePeopleRoundedIcon from '@mui/icons-material/NaturePeopleRounded';
import {FormControl, MenuItem, Select, Chip, Stack} from "@mui/material";
import { AnalysisContext } from "./context/AnalysisContetx.jsx";
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AcceptDialog({ isOpen, setOpen, props }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO finire submit
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle variant='h4'>
                {"Completa l'analisi"}
            </DialogTitle>
            <DialogContent>
                <Typography variant='h5'>{props.replica.replicaUniqueId}</Typography>
                <Stack direction='row' spacing={2}>
                    <Chip icon={<NaturePeopleRoundedIcon />} label={props.replica.treeId.treeUniqueId} />
                    <Chip icon={<GrassRoundedIcon />} label={props.replica.treeId.cultivar} />
                    <Chip icon={<CoronavirusRoundedIcon />} label={props.replica.treeId.infectionType} />
                </Stack>
                <Typography variant='body1'>Questa analisi verrà restituita a: {props.shipper.username}</Typography>
                <FormControl fullWidth>
                    //TODO aggiungere form
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} sx={{ color: '#2E644A', borderColor: '#2E644A'}} autoFocus>
                    Accetta
                </Button>
                <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
            </DialogActions>
        </Dialog>
    );
}

