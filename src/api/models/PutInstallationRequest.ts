/* tslint:disable */
/* eslint-disable */
/**
 * Patrehub API
 * This is a description of what this does
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * The request body for updating an installation.
 * @export
 * @interface PutInstallationRequest
 */
export interface PutInstallationRequest {
    /**
     * The installation id from github.
     * @type {string}
     * @memberof PutInstallationRequest
     */
    installationId: string;
}

/**
 * Check if a given object implements the PutInstallationRequest interface.
 */
export function instanceOfPutInstallationRequest(value: object): value is PutInstallationRequest {
    if (!('installationId' in value) || value['installationId'] === undefined) return false;
    return true;
}

export function PutInstallationRequestFromJSON(json: any): PutInstallationRequest {
    return PutInstallationRequestFromJSONTyped(json, false);
}

export function PutInstallationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PutInstallationRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'installationId': json['installation_id'],
    };
}

export function PutInstallationRequestToJSON(json: any): PutInstallationRequest {
    return PutInstallationRequestToJSONTyped(json, false);
}

export function PutInstallationRequestToJSONTyped(value?: PutInstallationRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'installation_id': value['installationId'],
    };
}
