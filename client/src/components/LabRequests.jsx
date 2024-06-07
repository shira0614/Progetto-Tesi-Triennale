import React from 'react';
import DrawerAppBar from './DrawerAppBar';
import { getApi } from '../utils/apiEndpoints';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import { NewAnalysisCard } from './AnalysisCard';
import { Box } from '@mui/material';
import { filterAnalyses } from '../utils/analysisUtils';
import { AnalysisContext } from "./context/AnalysisContetx.jsx";

export default function LabRequests() {
    const [analysisList, setAnalysisList] = useState([]);
    const [loading, setLoading] = useState(true);
    const analysisValue = { analysisList, setAnalysisList }

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
    }, []);

        if (loading) {
            return <Loading />
        }

    return (
        <>
            <AnalysisContext.Provider value={analysisValue}>
                <Box sx={{ overflowY: 'auto' }}>
                    <DrawerAppBar />
                    <Box>
                    {analysisList && filterAnalyses(analysisList, 'shipped').map((analysis) => {
                        return(
                            <NewAnalysisCard
                                key={analysis._id}
                                _id={analysis._id}
                                laboratory={analysis.laboratory}
                                replica={analysis.replica}
                                shipper={analysis.shipper}
                                status={analysis.status}
                                protocolId={analysis.protocolId}
                                notes={analysis.notes}
                                documents={analysis.documents}
                                image={analysis.imageUrl}
                            />
                        )
                    })}
                    </Box>
                </Box>
            </AnalysisContext.Provider>
        </>
    );
};

