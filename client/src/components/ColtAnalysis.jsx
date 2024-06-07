import * as React from 'react'
import DrawerAppBar from './DrawerAppBar'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {AnalysisContext} from "./context/AnalysisContetx.jsx";
import { getApi } from "../utils/apiEndpoints.js";
import Loading from "./Loading.jsx";
import {filterAnalyses, acceptedAnalyses} from "../utils/analysisUtils.js";
import {ColtAnalysisCard, CompletedAnalysis} from "./AnalysisCard.jsx";

export default function ColtAnalysis() {
    const [analysisList, setAnalysisList] = useState([])
    const [value, setValue] = React.useState('1');
    const [loading, setLoading] = useState(true);
    const analysisValue = { analysisList, setAnalysisList }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getApi('analysis').then((response) => {
            setAnalysisList(response)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <DrawerAppBar />
            <AnalysisContext.Provider value={analysisValue}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="In attesa" value="1" />
                            <Tab label="Nuove" value="2" />
                            <Tab label="Completate" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {
                                analysisList && filterAnalyses(analysisList, 'shipped').map((analysis) => {
                                    return <ColtAnalysisCard analysis={analysis} key={analysis._id}/>
                                })
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {
                            analysisList && acceptedAnalyses(analysisList).map((analysis) => {
                                return <ColtAnalysisCard analysis={analysis} key={analysis._id}/>
                            })
                        }
                    </Box>
                    </TabPanel>
                    <TabPanel value="3">
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {
                                analysisList && filterAnalyses(analysisList, 'completed').map((analysis) => {
                                    return <CompletedAnalysis analysis={analysis} key={analysis._id}/>
                                })
                            }
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
            </AnalysisContext.Provider>
        </>
    )
}