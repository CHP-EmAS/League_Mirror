export default interface MatchmakingSearchStateUpdate {
    errors: any[];
    lowPriorityData: LowPriorityData;
    searchState: string;
}

interface LowPriorityData {
    bustedLeaverAccessToken: string;
    penalizedSummonerIds: string[];
    penaltyTime: number;
    penaltyTimeRemaining: number;
    reason: string;
}