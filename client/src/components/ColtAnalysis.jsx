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
import Badge from '@mui/material/Badge';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {filterAnalyses, acceptedAnalyses, badgeAnalyses} from "../utils/analysisUtils.js";
import {ColtAnalysisCard, CompletedAnalysis} from "./AnalysisCard.jsx";

export default function ColtAnalysis() {
    const [analysisList, setAnalysisList] = useState([])
    const [value, setValue] = React.useState('1');
    const [loading, setLoading] = useState(true);
    const [badgeCounter, setBadgeCounter] = useState(0)
    const analysisValue = { analysisList, setAnalysisList, badgeCounter, setBadgeCounter }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getApi('analysis').then((response) => {
            setAnalysisList(response)
            setBadgeCounter(badgeAnalyses(response).length)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }, [badgeCounter]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <DrawerAppBar />
            <AnalysisContext.Provider value={analysisValue}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center', position: 'sticky', top: 0 }}>
                        <TabList onChange={handleChange}>
                            <Tab label="In attesa" value="1" icon={<ScheduleSendRoundedIcon sx={{ mb: 0.4 }}/>} iconPosition="end" sx={{ width: '200px' }} />
                            <Tab label="Nuove" value="2" sx={{ width: '200px' }} icon={<AnnouncementRoundedIcon sx={{ mb: 0.3 }}/>} iconPosition="end" />
                            <Tab label='Completate' value="3" sx={{ width: '200px' }} iconPosition="end" icon={<Badge badgeContent={badgeCounter} color='primary'>
                                <MailOutlineRoundedIcon sx={{ mb: 0.4 }}/>
                            </Badge>}/>
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