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
 * 
 * @export
 * @interface PostInstallationResponse
 */
export interface PostInstallationResponse {
    /**
     * 
     * @type {string}
     * @memberof PostInstallationResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PostInstallationResponse
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof PostInstallationResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PostInstallationResponse
     */
    status?: PostInstallationResponseStatusEnum;
}


/**
 * @export
 */
export const PostInstallationResponseStatusEnum = {
    Pending: 'pending',
    Active: 'active'
} as const;
export type PostInstallationResponseStatusEnum = typeof PostInstallationResponseStatusEnum[keyof typeof PostInstallationResponseStatusEnum];


/**
 * Check if a given object implements the PostInstallationResponse interface.
 */
export function instanceOfPostInstallationResponse(value: object): value is PostInstallationResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function PostInstallationResponseFromJSON(json: any): PostInstallationResponse {
    return PostInstallationResponseFromJSONTyped(json, false);
}

export function PostInstallationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostInstallationResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'userId': json['user_id'],
        'name': json['name'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

export function PostInstallationResponseToJSON(json: any): PostInstallationResponse {
    return PostInstallationResponseToJSONTyped(json, false);
}

export function PostInstallationResponseToJSONTyped(value?: PostInstallationResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'user_id': value['userId'],
        'name': value['name'],
        'status': value['status'],
    };
}

