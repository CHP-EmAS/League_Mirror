export default interface QueueChangeEvent {
    state: queueState;
    timeElapsed?: number;
    estimatedTime?: number;
}

export enum queueState {
    inQueue,
    outQueue,
    found
}