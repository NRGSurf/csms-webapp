/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TransactionEventResponseSchema = Array<{
    id: number;
    stationId: string;
    evseDatabaseId?: number;
    transactionId: string;
    isActive: boolean | null;
    chargingState: string | null;
    timeSpentCharging?: string | null;
    totalKwh?: string | null;
    stoppedReason: string;
    remoteStartId?: string | null;
    totalCost?: string | null;
    chargingTiming?: string | null;
    remainingTime?: string | null;
    startSOC?: string | null;
    latestSOC?: string | null;
    createdAt: string;
    updatedAt: string;
    idTokenId?: number | null;
} | null>;
