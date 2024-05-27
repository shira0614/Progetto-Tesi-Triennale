import * as React from 'react';
import DrawerAppBar from './DrawerAppBar';
import AnalysisCard from "./AnalysisCard.jsx";
import {useEffect, useState} from "react";
import { getApi } from '../utils/apiEndpoints.js'
import Loading from "./Loading.jsx";
import Box from "@mui/material/Box";

export default function LabHome() {
    const [analysisList, setAnalysisList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApi('analysis/labAnalyses')
            .then((response) => {
                setAnalysisList(response);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, [analysisList]);

    //TODO Loading component
        if (loading) {
            return <Loading />
        }

    return (
        <Box sx={{ overflowY: 'auto' }}>
            <DrawerAppBar />
            <Box>
            {analysisList.map((analysis) => {
                return(
                    <AnalysisCard
                        key={analysis._id}
                        laboratory={analysis.laboratory}
                        replica={analysis.replica}
                        shipper={analysis.shipper}
                        status={analysis.status}
                        protocolId={analysis.protocolId}
                        notes={analysis.notes}
                        documents={analysis.documents}
                        image={analysis.image}
                    />
                )
            })}
            </Box>
        </Box>
    )
}