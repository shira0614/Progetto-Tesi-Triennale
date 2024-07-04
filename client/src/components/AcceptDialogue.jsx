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
import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/'

export default function AcceptDialog({ isOpen, setOpen, id, protocolId }) {
    const { analysisList, setAnalysisList } = useContext(AnalysisContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            analysisId: id,
            status: 'accepted'
        };
        postApi('analysis/acceptAnalysis', body).then((data) => {
            if(data.success) {
                handleDownload().then(() => {
                    let updatedList = analysisList.map((analysis) => {
                        if(analysis._id === id) {
                            return {...analysis, status: 'accepted'};
                        }
                        return analysis;
                    });
                    setAnalysisList(updatedList);
                    handleClose();
                }).catch((e) => {
                    console.log(e);
                    handleClose();
                });
            }
        }).catch((e) => {
            console.log(e);
            handleClose();
        })
    }

    const handleDownload = async () => {
        try {
            const response = await axios.get(`${BASE_URL}analysis/download/${id}`, {
                responseType: 'blob',
                withCredentials: true
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const filename = protocolId ? `analysis_${protocolId}.zip` : `analysis_${id}.zip`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading the analysis:', error);
        }
    };

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
                    <DialogContentText>
                        Accettando questa analisi, verranno scaricati i relativi documenti
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='forest' onClick={handleSubmit} sx={{ mr: 1 }} autoFocus>
                        Accetta
                    </Button>
                    <Button onClick={handleClose} sx={{ color: '#0c0e0b' }}>Annulla</Button>
                </DialogActions>
            </Dialog>
    );
}