export default interface QueueChangeEvent {
    state: queueState;
    timeElapsed?: number;
    estimatedTime?: number;
    penaltyTimeRemaining?: number;
}

export enum queueState {
    inQueue,
    outQueue,
    found,
    penalty
}