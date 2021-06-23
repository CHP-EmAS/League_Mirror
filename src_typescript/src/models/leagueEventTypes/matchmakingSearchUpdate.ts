interface MatchmakingSearchUpdate {
    dodgeData: DodgeData;
    estimatedQueueTime: number;
    errors: Error[];
    isCurrentlyInQueue: boolean;
    lobbyId: string;
    lowPriorityData: LowPriorityData;
    queueId: number;
    readyCheck: ReadyCheck;
    searchState: string;
    timeInQueue: number;
}

interface DodgeData {
    dodgerId: number;
    state: string;
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

interface ReadyCheck {
    declinerIds: string[];
    dodgeWarning: string;
    playerResponse: string;
    state: string;
    suppressUx: boolean;
    timer: number;
}

export default MatchmakingSearchUpdate;