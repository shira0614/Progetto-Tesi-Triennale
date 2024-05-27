export function filterAnalyses(analyses, status) {
    return analyses.filter((analysis) => {
        return analysis.status !== status;
    });
}

export function shippedAnalyses(analyses) {
    return analyses.filter((analysis) => {
        return analysis.status === 'shipped';
    });
}