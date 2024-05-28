import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteApi } from "../utils/apiEndpoints.js";
import {useContext, useState} from "react";
import { AnalysisContext } from "./context/AnalysisContetx.jsx";

export default function AcceptDialog({ isOpen, setOpen, id }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        deleteApi('analysis/deleteAnalysis', id).then((data) => {
            if(data.success) {
                const updatedList = analysisList.filter((analysis) => {
                    return analysis._id !== id;
                });
                setAnalysisList(updatedList);
                handleClose();
            }
        }).catch((e) => {
            console.log(e);
            handleClose();
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle >
                {"Rifiuto richiesta di analisi"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Vuoi rifiutare questa analisi? La richiesta verrà eliminata.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' sx={{ color: '#d32727', borderColor: '#d32727'}} onClick={handleSubmit} autoFocus>
                    Rifiuta
                </Button>
                <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
            </DialogActions>
        </Dialog>
    );
}