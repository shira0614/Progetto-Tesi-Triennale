import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SuccessAlert from "./SuccessAlert.jsx";
import FailAlert from "./FailAlert.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import {SingleTreeContext} from "./context/TreeContext.jsx";

const BASE_URL = 'http://localhost:3000/api/'

export default function AddReplicaDialogue({isOpen, setOpen, treeId}) {
    const {replicas, setReplicas} = useContext(SingleTreeContext)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

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

        if (data.get('image') && data.get('image').size) {
            const validTypes = ['image/png', 'image/jpeg'];

            if (!validTypes.includes(data.get('image').type)) {
                alert("Scegliere un'immagine con un formato .jpg o .png");
                return;
            }
        }

        axios.post(`${BASE_URL}trees/newReplica`, body, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if(response.data.success) {
                console.log(response.data);
                replicas.push(response.data.replica)
                setReplicas(replicas)
                setOpenSuccess(true)
                handleClose()
            }
        }).catch((e) => {
            console.log(e);
            setOpenFail(true)
        });
    }

    return (
        <>
            <FailAlert open={openFail} setOpen={setOpenFail} message={"Non è stato possibile aggiungere la replica correttamente. Riprovare"}></FailAlert>
            <SuccessAlert open={openSuccess} setOpen={setOpenSuccess} message={'Replica creata con successo'}/>
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
                        sx={{ mt: 5 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Annulla</Button>
                    <Button type="submit">Aggiungi</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}