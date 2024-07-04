import { createContext } from "react";

export const AnalysisContext = createContext(
    {
        analysisList: [],
        setAnalysisList: () => {},
        badgeCounter: 0,
        setBadgeCounter: () => {}
    }
);