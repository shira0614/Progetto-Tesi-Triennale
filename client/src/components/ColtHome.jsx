import * as React from 'react'
import DrawerAppBar from './DrawerAppBar'
import {TreeContext} from "./context/TreeContext.jsx";
import Box from "@mui/material/Box";
import TreeCard from "./TreeCard.jsx";
import {useEffect, useState} from "react";
import {getApi} from "../utils/apiEndpoints.js";
import Loading from "./Loading.jsx";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {dateArrFormatter} from "../utils/treeUtils.js";
import AddTreeDialogue from "./AddTreeDialogue.jsx";
import Button from "@mui/material/Button";

export default function ColtHome() {
    const [treeList, setTreeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const treeValue = { treeList, setTreeList };
    const [open, setOpen]  = useState(false)

    const handleAddTree = () => { setOpen(true) };

    useEffect(() => {
        getApi('trees/')
            .then((response) => {
                console.log(response)
                dateArrFormatter(response);
                setTreeList(response);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <Box sx={{ overflowY: 'auto' }}>
            <TreeContext.Provider value={treeValue}>
                <AddTreeDialogue open={open} setOpen={setOpen}/>
                <DrawerAppBar />
                <Box>
                    { treeList.map((tree) => {
                        return(
                            <TreeCard
                                key={tree._id}
                                _id={tree._id}
                                scifiName={tree.specieNomeScientifico}
                                commonName={tree.specieNomeComune}
                                subSpecie={tree.sottospecie}
                                cultivar={tree.cultivar}
                                inoculated={tree.inoculated}
                                notes={tree.notes}
                                replicas={tree.replicas}
                                date={tree.timestamp}
                                image={tree.imageUrl}
                                treeUniqueId={tree.treeUniqueId}
                            />
                        )
                    })
                    }
                </Box>
                {/* TODO aggiustare i Fab */}
                <Button color="forest" variant='contained' onClick={handleAddTree} sx={{ display: { xs: 'none', sm: 'block' },
                position: 'fixed', bottom: 15, right: 15, color: '#ffffff' }}>
                    Aggiungi nuovo albero
                </Button>
                <Fab color="forest" onClick={handleAddTree} sx={{ display: { xs: 'block', sm: 'none' },
                position: 'fixed', bottom: 15, right: 15 }}>
                    <AddIcon sx={{ mt: 1, color: '#ffffff' }}/>
                </Fab>
            </TreeContext.Provider>
        </Box>
    )
}
