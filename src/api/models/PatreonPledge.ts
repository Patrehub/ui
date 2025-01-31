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
import type { PatreonUser } from './PatreonUser';
import {
    PatreonUserFromJSON,
    PatreonUserFromJSONTyped,
    PatreonUserToJSON,
    PatreonUserToJSONTyped,
} from './PatreonUser';
import type { PatreonReward } from './PatreonReward';
import {
    PatreonRewardFromJSON,
    PatreonRewardFromJSONTyped,
    PatreonRewardToJSON,
    PatreonRewardToJSONTyped,
} from './PatreonReward';

/**
 * 
 * @export
 * @interface PatreonPledge
 */
export interface PatreonPledge {
    /**
     * 
     * @type {string}
     * @memberof PatreonPledge
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof PatreonPledge
     */
    amountCents: number;
    /**
     * 
     * @type {Date}
     * @memberof PatreonPledge
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof PatreonPledge
     */
    declinedSince?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof PatreonPledge
     */
    patronPaysFees: boolean;
    /**
     * 
     * @type {number}
     * @memberof PatreonPledge
     */
    pledgeCapCents: number;
    /**
     * 
     * @type {number}
     * @memberof PatreonPledge
     */
    totalHistoricalAmountCents: number;
    /**
     * 
     * @type {PatreonUser}
     * @memberof PatreonPledge
     */
    creator: PatreonUser;
    /**
     * 
     * @type {PatreonReward}
     * @memberof PatreonPledge
     */
    rewards: PatreonReward;
}

/**
 * Check if a given object implements the PatreonPledge interface.
 */
export function instanceOfPatreonPledge(value: object): value is PatreonPledge {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('amountCents' in value) || value['amountCents'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('patronPaysFees' in value) || value['patronPaysFees'] === undefined) return false;
    if (!('pledgeCapCents' in value) || value['pledgeCapCents'] === undefined) return false;
    if (!('totalHistoricalAmountCents' in value) || value['totalHistoricalAmountCents'] === undefined) return false;
    if (!('creator' in value) || value['creator'] === undefined) return false;
    if (!('rewards' in value) || value['rewards'] === undefined) return false;
    return true;
}

export function PatreonPledgeFromJSON(json: any): PatreonPledge {
    return PatreonPledgeFromJSONTyped(json, false);
}

export function PatreonPledgeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatreonPledge {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'amountCents': json['amount_cents'],
        'createdAt': (new Date(json['created_at'])),
        'declinedSince': json['declined_since'] == null ? undefined : (new Date(json['declined_since'])),
        'patronPaysFees': json['patron_pays_fees'],
        'pledgeCapCents': json['pledge_cap_cents'],
        'totalHistoricalAmountCents': json['total_historical_amount_cents'],
        'creator': PatreonUserFromJSON(json['creator']),
        'rewards': PatreonRewardFromJSON(json['rewards']),
    };
}

export function PatreonPledgeToJSON(json: any): PatreonPledge {
    return PatreonPledgeToJSONTyped(json, false);
}

export function PatreonPledgeToJSONTyped(value?: PatreonPledge | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'amount_cents': value['amountCents'],
        'created_at': ((value['createdAt']).toISOString()),
        'declined_since': value['declinedSince'] == null ? undefined : ((value['declinedSince']).toISOString()),
        'patron_pays_fees': value['patronPaysFees'],
        'pledge_cap_cents': value['pledgeCapCents'],
        'total_historical_amount_cents': value['totalHistoricalAmountCents'],
        'creator': PatreonUserToJSON(value['creator']),
        'rewards': PatreonRewardToJSON(value['rewards']),
    };
}

