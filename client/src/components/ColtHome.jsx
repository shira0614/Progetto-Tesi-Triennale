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

export default function ColtHome() {
    const [treeList, setTreeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const treeValue = { treeList, setTreeList }

    useEffect(() => {
        getApi('trees/')
            .then((response) => {
                response.forEach(tree => {
                    let date = new Date(tree.timestamp);
                    let day = ("0" + date.getDate()).slice(-2);
                    let month = ("0" + (date.getMonth() + 1)).slice(-2);
                    let year = date.getFullYear();
                    tree.timestamp = `${day}/${month}/${year}`;
                });
                setTreeList(response);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, []);

    //TODO Loading component
    if (loading) {
        return <Loading />
    }

    return (
        <Box sx={{ overflowY: 'auto' }}>
            <TreeContext.Provider value={treeValue}>
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
                                image={tree.image}
                                treeUniqueId={tree.treeUniqueId}
                            />
                        )
                    })
                    }
                </Box>
                {
                   //TODO conditional rendering of the add tree button
                }
            </TreeContext.Provider>
        </Box>
    )
}
