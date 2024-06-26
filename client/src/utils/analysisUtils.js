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

export function badgeAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'completed' && !analysis.downloaded
    })
}