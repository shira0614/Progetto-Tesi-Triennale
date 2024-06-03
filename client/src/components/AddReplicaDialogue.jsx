import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postApi } from "../utils/apiEndpoints.js";
import {useContext, useState} from "react";
import {SingleTreeContext} from "./context/TreeContext.jsx";

export default function AddReplicaDialogue({isOpen, setOpen, treeId}) {
    const {replicas, setReplicas} = useContext(SingleTreeContext)

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            treeId: treeId,
            sample: data.get('sample'),
            image: data.get('image'),
            notes: data.get('notes')
        };
        postApi('trees/newReplica', body).then((response) => {
            console.log(response);
            if(response.success) {
                replicas.push(response.replica)
                setReplicas(replicas)
                setOpen(false);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Aggiungi una replica</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La replica erediterà tutte le caratteristiche della pianta madre.
                    </DialogContentText>
                    <DialogContentText>
                        Specificare di seguito ulteriori attributi.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sample"
                        name="sample"
                        label="Campioni"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="notes"
                        name="notes"
                        label="Note"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button>Aggiungi immagine</Button>
                    <Button onClick={handleClose}>Annulla</Button>
                    <Button type="submit">Aggiungi</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}