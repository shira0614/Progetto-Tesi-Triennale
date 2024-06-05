import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postApi } from "../utils/apiEndpoints.js";
import {useContext, useState} from "react";
import { AnalysisContext } from "./context/AnalysisContetx.jsx";

export default function AcceptDialog({ isOpen, setOpen, id }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            analysisId: id,
            status: 'rejected'
        };
        postApi('analysis/acceptAnalysis', body).then((data) => {
            if(data.success) {
                let updatedList = analysisList.map((analysis) => {
                    if(analysis._id === id) {
                        return {...analysis, status: 'rejected'};
                    }
                    return analysis;
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
                {"Rifiuta richiesta di analisi"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Vuoi rifiutare questa analisi?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' sx={{ mr: 1 }} onClick={handleSubmit} autoFocus>
                    Rifiuta
                </Button>
                <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
            </DialogActions>
        </Dialog>
    );
}