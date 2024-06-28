import * as React from 'react';
import DrawerAppBar from './DrawerAppBar';
import { HomeAnalysisCard } from "./AnalysisCard.jsx";
import {useEffect, useState} from "react";
import { getApi } from '../utils/apiEndpoints.js'
import Loading from "./Loading.jsx";
import { filterAnalyses } from '../utils/analysisUtils.js';
import Box from "@mui/material/Box";
import {AlertContext} from "./context/AlertContext.jsx";
import { AnalysisContext } from "./context/AnalysisContetx.jsx";
import FailAlert from "./FailAlert.jsx";
import SuccessAlert from "./SuccessAlert.jsx";

export default function LabHome() {
    const [analysisList, setAnalysisList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const analysisValue = { analysisList, setAnalysisList }
    const alertValue = { openSuccess, setOpenSuccess, openFail, setOpenFail }

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
            <FailAlert open={openFail} setOpen={setOpenFail} message={"L'analisi non è stata inviata correttamente. Riprovare"}></FailAlert>
            <SuccessAlert open={openSuccess} setOpen={setOpenSuccess} message={'Analisi inviata con successo'} />
            <Box sx={{ overflowY: 'auto' }}>
                <AnalysisContext.Provider value={analysisValue}>
                    <AlertContext.Provider value={alertValue}>
                        <DrawerAppBar />
                        <Box>
                        {analysisList && filterAnalyses(analysisList, 'accepted').map((analysis) => {
                            return(
                                <HomeAnalysisCard
                                    key={analysis._id}
                                    analysis={analysis}
                                />
                            )
                        })}
                        </Box>
                    </AlertContext.Provider>
                </AnalysisContext.Provider>
            </Box>
        </>
    )
}