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
 * @interface GithubInstallationPermissions
 */
export interface GithubInstallationPermissions {
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    actions?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    administration?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    checks?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    contents?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    deployments?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    issues?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    metadata?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    pages?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    pullRequests?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    repositoryHooks?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    repositoryProjects?: string;
    /**
     * 
     * @type {string}
     * @memberof GithubInstallationPermissions
     */
    statuses?: string;
}

/**
 * Check if a given object implements the GithubInstallationPermissions interface.
 */
export function instanceOfGithubInstallationPermissions(value: object): value is GithubInstallationPermissions {
    return true;
}

export function GithubInstallationPermissionsFromJSON(json: any): GithubInstallationPermissions {
    return GithubInstallationPermissionsFromJSONTyped(json, false);
}

export function GithubInstallationPermissionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GithubInstallationPermissions {
    if (json == null) {
        return json;
    }
    return {
        
        'actions': json['actions'] == null ? undefined : json['actions'],
        'administration': json['administration'] == null ? undefined : json['administration'],
        'checks': json['checks'] == null ? undefined : json['checks'],
        'contents': json['contents'] == null ? undefined : json['contents'],
        'deployments': json['deployments'] == null ? undefined : json['deployments'],
        'issues': json['issues'] == null ? undefined : json['issues'],
        'metadata': json['metadata'] == null ? undefined : json['metadata'],
        'pages': json['pages'] == null ? undefined : json['pages'],
        'pullRequests': json['pull_requests'] == null ? undefined : json['pull_requests'],
        'repositoryHooks': json['repository_hooks'] == null ? undefined : json['repository_hooks'],
        'repositoryProjects': json['repository_projects'] == null ? undefined : json['repository_projects'],
        'statuses': json['statuses'] == null ? undefined : json['statuses'],
    };
}

export function GithubInstallationPermissionsToJSON(json: any): GithubInstallationPermissions {
    return GithubInstallationPermissionsToJSONTyped(json, false);
}

export function GithubInstallationPermissionsToJSONTyped(value?: GithubInstallationPermissions | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'actions': value['actions'],
        'administration': value['administration'],
        'checks': value['checks'],
        'contents': value['contents'],
        'deployments': value['deployments'],
        'issues': value['issues'],
        'metadata': value['metadata'],
        'pages': value['pages'],
        'pull_requests': value['pullRequests'],
        'repository_hooks': value['repositoryHooks'],
        'repository_projects': value['repositoryProjects'],
        'statuses': value['statuses'],
    };
}

