import * as React from 'react'
import DrawerAppBar from './DrawerAppBar'
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { getApi } from "../utils/apiEndpoints.js";
import Loading from "./Loading.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReplicaCard from "./ReplicaCard.jsx";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddReplicaDialogue from "./AddReplicaDialogue.jsx";
import { SingleTreeContext } from "./context/TreeContext.jsx";

export default function TreeView() {
    const { treeId } = useParams();
    const [tree, setTree] = React.useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const treeValue = { tree, setTree };

    useEffect(() => {
        getApi(`trees/${treeId}`)
            .then((response) => {
                let date = new Date(response.timestamp);
                let day = String(date.getDate()).padStart(2, '0');
                let month = String(date.getMonth() + 1).padStart(2, '0');
                let year = date.getFullYear();

                response.timestamp = `${day}/${month}/${year}`;

                setTree(response);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, [treeId]);

    const handleClick = () => {
        setOpen(true)
    }

    //TODO Loading component
    if (loading) {
        return <Loading />
    }

    return (
        <Box sx={{ overflowY: 'auto' }}>
            <SingleTreeContext.Provider value={treeValue}>
            <AddReplicaDialogue isOpen={open} setOpen={setOpen} treeId={treeId}/>
            <DrawerAppBar />
            <Typography variant='h4' sx={{ mb: '2%', ml: '3%' }}>Scheda dell'albero: {tree.treeUniqueId}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100vw'}}>
                <Box sx={{ display: 'flex',
                    flexDirection: 'row', ml: '3%'}}>
                    <Box sx={{ flex: 1, minWidth: '55%' }}>
                        <Typography variant='h5'>Specie</Typography>
                        &nbsp;
                            <Typography fontWeight='bold'>Nome scientifico:
                                <Typography display='inline'> {tree.specieNomeScientifico}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Nome comune:
                                <Typography display='inline'> {tree.specieNomeComune}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Sottospecie:
                                <Typography display='inline'> {tree.sottospecie}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Cultivar:
                                <Typography display='inline'> {tree.cultivar}</Typography>
                            </Typography>
                        &nbsp;
                        <Typography variant='h5'>Altre informazioni</Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Data di nascita:
                                <Typography display='inline'> {tree.timestamp}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Inoculazione:
                                <Typography display='inline'> {tree.inoculated ? 'Si' : 'No'}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Tipo di infezione:
                                <Typography display='inline'> {tree.infectionType}</Typography>
                            </Typography>
                            &nbsp;
                            <Typography fontWeight='bold'>Note:
                                <Typography display='inline'> {tree.notes}</Typography>
                            </Typography>
                    </Box>
                    <Box sx={{ flex: 2, ml: '20%', minWidth: '70%', overflowY: 'auto', pl: 2 }}>
                    <Typography variant='h5'>Repliche</Typography>
                        <Fab size="small" onClick={handleClick}>
                            <AddIcon />
                        </Fab>
                        {
                            tree.replicas.map((replica) => {
                                return (
                                    <ReplicaCard
                                        key={replica._id}
                                        replicaUniqueId={replica.replicaUniqueId}
                                        image={replica.image}
                                        sample={replica.sample}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
                {
                    tree.image && <Box
                    component='img'
                    alt='Tree image'
                    src={tree.image}
                    sx={{
                        minHeight: 200,
                        minWidth: 200
                    }}
                    />
                }
            </Box>
            </SingleTreeContext.Provider>
        </Box>
    )
}