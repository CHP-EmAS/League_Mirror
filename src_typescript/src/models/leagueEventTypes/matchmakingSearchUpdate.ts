interface MatchmakingSearchUpdate {
    dodgeData: DodgeData;
    estimatedQueueTime: number;
    errors: any[];
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