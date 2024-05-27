import React from 'react';
import DrawerAppBar from './DrawerAppBar';
import { getApi } from '../utils/apiEndpoints';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import AnalysisCard from './AnalysisCard';
import { Box } from '@mui/material';
import { shippedAnalyses } from '../utils/analysisUtils';

export default function LabRequests() {
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
        <>
        <Box sx={{ overflowY: 'auto' }}>
            <DrawerAppBar />
            <Box>
            {analysisList && shippedAnalyses(analysisList).map((analysis) => {
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
        </>
    );
};

