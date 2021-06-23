export default interface MatchmakingSearchStateUpdate {
    errors: Error[];
    lowPriorityData: LowPriorityData;
    searchState: string;
}

interface Error {
    id: number;
    errorType: string;
    message: string;
    penalizedSummonerId: number;
    penaltyTimeRemaining: number;
}

interface LowPriorityData {
    bustedLeaverAccessToken: string;
    penalizedSummonerIds: string[];
    penaltyTime: number;
    penaltyTimeRemaining: number;
    reason: string;
}