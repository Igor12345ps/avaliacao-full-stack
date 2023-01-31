export type Transfer = {
    id: number;
    originAccount: string;
    destinationAccount: string;
    transferValue: number;
    tax: number;
    totalValue: number;
    transferCompletionDate: string;
    schedulingDate: string;
}