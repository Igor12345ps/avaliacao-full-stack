export type Transfer = {
    id?: number;
    originAccount: string;
    destinationAccount: string;
    transferValue: number;
    tax?: number;
    transferCompletionDate: string;
    schedulingDate: string;
}