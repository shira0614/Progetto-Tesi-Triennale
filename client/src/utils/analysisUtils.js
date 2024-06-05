export function filterAnalyses(analyses, status) {
    return analyses.filter((analysis) => {
        return analysis.status === status;
    });
}

export function acceptedAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'accepted' || analysis.status === 'rejected';
    });
}