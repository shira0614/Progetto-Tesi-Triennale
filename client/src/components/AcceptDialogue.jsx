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
            analysisId: id
        };
        postApi('analysis/acceptAnalysis', body).then((data) => {
            if(data.success) {
                const updatedList = analysisList.map((analysis) => {
                    if(analysis._id === id) {
                        analysis.status = 'accepted';
                    }
                    return updatedList;
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
                    {"Accetta richiesta di analisi"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Vuoi accettare questa analisi?
                    </DialogContentText>
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