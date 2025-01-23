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
 * @interface Tier
 */
export interface Tier {
    /**
     * 
     * @type {string}
     * @memberof Tier
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof Tier
     */
    amountCents: number;
    /**
     * 
     * @type {Date}
     * @memberof Tier
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof Tier
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof Tier
     */
    editedAt: Date;
    /**
     * 
     * @type {string}
     * @memberof Tier
     */
    imageUrl?: string;
    /**
     * 
     * @type {number}
     * @memberof Tier
     */
    patronCount: number;
    /**
     * 
     * @type {number}
     * @memberof Tier
     */
    postCount: number;
    /**
     * 
     * @type {boolean}
     * @memberof Tier
     */
    published: boolean;
    /**
     * 
     * @type {Date}
     * @memberof Tier
     */
    publishedAt: Date;
    /**
     * 
     * @type {string}
     * @memberof Tier
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Tier
     */
    url: string;
}

/**
 * Check if a given object implements the Tier interface.
 */
export function instanceOfTier(value: object): value is Tier {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('amountCents' in value) || value['amountCents'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('editedAt' in value) || value['editedAt'] === undefined) return false;
    if (!('patronCount' in value) || value['patronCount'] === undefined) return false;
    if (!('postCount' in value) || value['postCount'] === undefined) return false;
    if (!('published' in value) || value['published'] === undefined) return false;
    if (!('publishedAt' in value) || value['publishedAt'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('url' in value) || value['url'] === undefined) return false;
    return true;
}

export function TierFromJSON(json: any): Tier {
    return TierFromJSONTyped(json, false);
}

export function TierFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tier {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'amountCents': json['amount_cents'],
        'createdAt': (new Date(json['created_at'])),
        'description': json['description'],
        'editedAt': (new Date(json['edited_at'])),
        'imageUrl': json['image_url'] == null ? undefined : json['image_url'],
        'patronCount': json['patron_count'],
        'postCount': json['post_count'],
        'published': json['published'],
        'publishedAt': (new Date(json['published_at'])),
        'title': json['title'],
        'url': json['url'],
    };
}

export function TierToJSON(json: any): Tier {
    return TierToJSONTyped(json, false);
}

export function TierToJSONTyped(value?: Tier | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'amount_cents': value['amountCents'],
        'created_at': ((value['createdAt']).toISOString()),
        'description': value['description'],
        'edited_at': ((value['editedAt']).toISOString()),
        'image_url': value['imageUrl'],
        'patron_count': value['patronCount'],
        'post_count': value['postCount'],
        'published': value['published'],
        'published_at': ((value['publishedAt']).toISOString()),
        'title': value['title'],
        'url': value['url'],
    };
}

