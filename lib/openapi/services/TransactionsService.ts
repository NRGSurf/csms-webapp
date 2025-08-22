/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingStationResponseSchema } from '../models/ChargingStationResponseSchema';
import type { IdTokenResponse } from '../models/IdTokenResponse';
import type { LocationResponseSchema } from '../models/LocationResponseSchema';
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_CostUpdatedRequest } from '../models/ocpp2_0_1_CostUpdatedRequest';
import type { ocpp2_0_1_GetTransactionStatusRequest } from '../models/ocpp2_0_1_GetTransactionStatusRequest';
import type { processPaymentSchema } from '../models/processPaymentSchema';
import type { SystemConfigSchema } from '../models/SystemConfigSchema';
import type { TariffResponseSchema } from '../models/TariffResponseSchema';
import type { TariffSchema } from '../models/TariffSchema';
import type { TransactionEventResponseSchema } from '../models/TransactionEventResponseSchema';
import type { TransactionEventsResponseSchema } from '../models/TransactionEventsResponseSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201TransactionsCostUpdated({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_CostUpdatedRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/transactions/costUpdated',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201TransactionsGetTransactionStatus({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetTransactionStatusRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/transactions/getTransactionStatus',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TransactionEventResponseSchema Default Response
     * @throws ApiError
     */
    public static getDataTransactionsTransaction({
        stationId,
        transactionId,
        tenantId = 1,
    }: {
        stationId: string,
        transactionId: string,
        tenantId?: number,
    }): CancelablePromise<TransactionEventResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/transaction',
            query: {
                'stationId': stationId,
                'transactionId': transactionId,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns TransactionEventsResponseSchema Default Response
     * @throws ApiError
     */
    public static getDataTransactionsTransactions({
        stationId,
        isActive,
        idToken,
        tenantId = 1,
    }: {
        stationId?: string,
        isActive?: boolean,
        idToken?: string,
        tenantId?: number,
    }): CancelablePromise<TransactionEventsResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/transactions',
            query: {
                'stationId': stationId,
                'isActive': isActive,
                'idToken': idToken,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataTransactionsTariff({
        tenantId = 1,
        requestBody,
    }: {
        tenantId?: number,
        requestBody?: TariffSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/transactions/tariff',
            query: {
                'tenantId': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TariffResponseSchema Default Response
     * @throws ApiError
     */
    public static getDataTransactionsTariff({
        tenantId = 1,
        id,
    }: {
        tenantId?: number,
        id?: string,
    }): CancelablePromise<TariffResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/tariff',
            query: {
                'tenantId': tenantId,
                'id': id,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteDataTransactionsTariff({
        tenantId = 1,
        id,
    }: {
        tenantId?: number,
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/transactions/tariff',
            query: {
                'tenantId': tenantId,
                'id': id,
            },
        });
    }
    /**
     * @returns ChargingStationResponseSchema Default Response
     * @throws ApiError
     */
    public static getDataTransactionsChargingStation({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<ChargingStationResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/chargingStation',
            query: {
                'stationId': stationId,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns LocationResponseSchema Default Response
     * @throws ApiError
     */
    public static getDataTransactionsLocation({
        locationId,
        tenantId = 1,
    }: {
        locationId: number,
        tenantId?: number,
    }): CancelablePromise<LocationResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/location',
            query: {
                'locationId': locationId,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns IdTokenResponse Default Response
     * @throws ApiError
     */
    public static getDataTransactionsIdToken({
        idTokenId,
        tenantId = 1,
    }: {
        idTokenId: number,
        tenantId?: number,
    }): CancelablePromise<IdTokenResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/idToken',
            query: {
                'idTokenId': idTokenId,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataTransactionsProcessPayment({
        requestBody,
    }: {
        requestBody?: processPaymentSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/transactions/processPayment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataTransactionsSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/transactions/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataTransactionsSystemConfig({
        requestBody,
    }: {
        requestBody?: SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/transactions/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
