import * as React from 'react'
import DrawerAppBar from './DrawerAppBar'
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { getApi } from "../utils/apiEndpoints.js";
import Loading from "./Loading.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TreeView() {
    const { treeId } = useParams();
    const [tree, setTree] = React.useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApi(`trees/${treeId}`)
            .then((response) => {
                let date = new Date(response.timestamp);
                let day = String(date.getDate()).padStart(2, '0');
                let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
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

    //TODO Loading component
    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <DrawerAppBar />
            <Box sx={{ display: 'flex', alignItems: 'flex-start',
                flexDirection: 'row', width: '100vw', m: '1rem'}}>
                <Typography variant='h3' sx={{ ml: '2rem' }}>{tree.treeUniqueId}</Typography>

            </Box>
        </div>
    )
}