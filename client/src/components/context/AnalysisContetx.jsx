import { createContext } from "react";

export const AnalysisContext = createContext(
    {
        analysisList: [],
        setAnalysisList: () => {}
    }
);