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
import {dateFormatter} from "../utils/treeUtils.js";
import { SingleTreeContext } from "./context/TreeContext.jsx";

export default function TreeView() {
    const { treeId } = useParams();
    const [tree, setTree] = useState(null);
    const [replicas, setReplicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [open, setOpen] = useState(false)
    const treeValue = { tree, setTree, replicas, setReplicas };

    useEffect(() => {
        getApi(`trees/${treeId}`)
            .then((response) => {
                console.log(response)
                response.tree.timestamp = dateFormatter(response.tree.timestamp);

                setTree(response.tree);
                setImageUrl(response.imageUrl);

                getApi(`trees/${treeId}/replicas`).then((response) => {
                    setReplicas(response);
                    setLoading(false);
                })
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
            <Typography variant='h4' sx={{ mb: '2%', ml: '3%' }}>Scheda della coltura: {tree.treeUniqueId}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100vw', flexWrap: 'wrap', justifyContent: 'space-between', ml: '3%', alignContent: 'space-between'}}>
                <Box sx={{ display: 'flex',
                    flexDirection: 'row'}}>
                    <Box sx={{ flex: 1, minWidth: '30%' }}>
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
                                <Typography display='inline'> {tree.notes ? tree.notes : 'Nessuna'}</Typography>
                            </Typography>
                    </Box>
                    <Box sx={{ flex: 1, ml: 3, minWidth: '30rem', overflow: 'auto', pl: 2 }}>
                    <Typography variant='h5'>Repliche</Typography>
                        <Fab color='forest' size="small" onClick={handleClick} sx={{ mt: 1, mb: 1, '&:hover': { backgroundColor: '#3d8864' } }}>
                            <AddIcon sx={{ color: '#ffffff' }}/>
                        </Fab>
                        {replicas.map((replica) => {
                                return (
                                    <ReplicaCard
                                        key={replica._id}
                                        replicaUniqueId={replica.replicaUniqueId}
                                        image={replica.imageUrl}
                                        sample={replica.sample}
                                        notes={replica.notes}
                                        replica={replica}
                                    />
                                )
                            })
                        }
                    </Box>
                    {
                        imageUrl && <Box
                            component='img'
                            alt='Tree image'
                            src={imageUrl}
                            sx={{
                                flex: 1,
                                maxHeight: '50%',
                                maxWidth: '50%',
                                objectFit: 'contain',
                                pl: '5%',
                                pr: '5%'
                            }}
                        />
                    }
                </Box>
            </Box>
            </SingleTreeContext.Provider>
        </Box>
    )
}