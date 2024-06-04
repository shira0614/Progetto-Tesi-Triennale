export function filterAnalyses(analyses, status) {
    return analyses.filter((analysis) => {
        return analysis.status === status;
    });
}

export function shippedAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'shipped';
    });
}

export function completedAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'completed';
    });
}

export function acceptedAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'accepted' || analysis.status === 'rejected';
    });
}