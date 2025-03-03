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
 * The request body for creating a new benefit.
 * @export
 * @interface PostBenefitRequest
 */
export interface PostBenefitRequest {
    /**
     * The unique identifier for the installation.
     * @type {number}
     * @memberof PostBenefitRequest
     */
    tierId: number;
    /**
     * The type of the benefit.
     * @type {string}
     * @memberof PostBenefitRequest
     */
    type: PostBenefitRequestTypeEnum;
    /**
     * The unique identifier for the installation.
     * @type {number}
     * @memberof PostBenefitRequest
     */
    installationId: number;
    /**
     * The unique identifier for the team.
     * @type {number}
     * @memberof PostBenefitRequest
     */
    teamId?: number;
    /**
     * The unique identifier for the repository.
     * @type {string}
     * @memberof PostBenefitRequest
     */
    repository?: string;
}


/**
 * @export
 */
export const PostBenefitRequestTypeEnum = {
    Repository: 'repository',
    Team: 'team'
} as const;
export type PostBenefitRequestTypeEnum = typeof PostBenefitRequestTypeEnum[keyof typeof PostBenefitRequestTypeEnum];


/**
 * Check if a given object implements the PostBenefitRequest interface.
 */
export function instanceOfPostBenefitRequest(value: object): value is PostBenefitRequest {
    if (!('tierId' in value) || value['tierId'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('installationId' in value) || value['installationId'] === undefined) return false;
    return true;
}

export function PostBenefitRequestFromJSON(json: any): PostBenefitRequest {
    return PostBenefitRequestFromJSONTyped(json, false);
}

export function PostBenefitRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostBenefitRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'tierId': json['tier_id'],
        'type': json['type'],
        'installationId': json['installation_id'],
        'teamId': json['team_id'] == null ? undefined : json['team_id'],
        'repository': json['repository'] == null ? undefined : json['repository'],
    };
}

export function PostBenefitRequestToJSON(json: any): PostBenefitRequest {
    return PostBenefitRequestToJSONTyped(json, false);
}

export function PostBenefitRequestToJSONTyped(value?: PostBenefitRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'tier_id': value['tierId'],
        'type': value['type'],
        'installation_id': value['installationId'],
        'team_id': value['teamId'],
        'repository': value['repository'],
    };
}

