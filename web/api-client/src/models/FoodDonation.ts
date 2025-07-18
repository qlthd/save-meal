/* tslint:disable */
/* eslint-disable */
/**
 * Save meal API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Booking } from './Booking';
import {
    BookingFromJSON,
    BookingFromJSONTyped,
    BookingToJSON,
    BookingToJSONTyped,
} from './Booking';

/**
 * 
 * @export
 * @interface FoodDonation
 */
export interface FoodDonation {
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    foodType: string;
    /**
     * 
     * @type {number}
     * @memberof FoodDonation
     */
    estimatedPortions: number;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    description: string;
    /**
     * 
     * @type {object}
     * @memberof FoodDonation
     */
    pickupPlace?: object | null;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    address: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    pickupInstructions: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    availableFrom: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    availableTo: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    contactName: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    contactPhone: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    contactEmail: string;
    /**
     * 
     * @type {number}
     * @memberof FoodDonation
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof FoodDonation
     */
    longitude: number;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    additionalNotes?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    createdAt?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FoodDonation
     */
    updatedAt?: string | null;
    /**
     * 
     * @type {Booking}
     * @memberof FoodDonation
     */
    booking?: Booking | null;
}

/**
 * Check if a given object implements the FoodDonation interface.
 */
export function instanceOfFoodDonation(value: object): value is FoodDonation {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('foodType' in value) || value['foodType'] === undefined) return false;
    if (!('estimatedPortions' in value) || value['estimatedPortions'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('pickupInstructions' in value) || value['pickupInstructions'] === undefined) return false;
    if (!('availableFrom' in value) || value['availableFrom'] === undefined) return false;
    if (!('availableTo' in value) || value['availableTo'] === undefined) return false;
    if (!('contactName' in value) || value['contactName'] === undefined) return false;
    if (!('contactPhone' in value) || value['contactPhone'] === undefined) return false;
    if (!('contactEmail' in value) || value['contactEmail'] === undefined) return false;
    if (!('latitude' in value) || value['latitude'] === undefined) return false;
    if (!('longitude' in value) || value['longitude'] === undefined) return false;
    return true;
}

export function FoodDonationFromJSON(json: any): FoodDonation {
    return FoodDonationFromJSONTyped(json, false);
}

export function FoodDonationFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoodDonation {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'foodType': json['foodType'],
        'estimatedPortions': json['estimatedPortions'],
        'description': json['description'],
        'pickupPlace': json['pickupPlace'] == null ? undefined : json['pickupPlace'],
        'address': json['address'],
        'pickupInstructions': json['pickupInstructions'],
        'availableFrom': json['availableFrom'],
        'availableTo': json['availableTo'],
        'contactName': json['contactName'],
        'contactPhone': json['contactPhone'],
        'contactEmail': json['contactEmail'],
        'latitude': json['latitude'],
        'longitude': json['longitude'],
        'additionalNotes': json['additionalNotes'] == null ? undefined : json['additionalNotes'],
        'createdAt': json['createdAt'] == null ? undefined : json['createdAt'],
        'updatedAt': json['updatedAt'] == null ? undefined : json['updatedAt'],
        'booking': json['booking'] == null ? undefined : BookingFromJSON(json['booking']),
    };
}

export function FoodDonationToJSON(json: any): FoodDonation {
    return FoodDonationToJSONTyped(json, false);
}

export function FoodDonationToJSONTyped(value?: FoodDonation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'foodType': value['foodType'],
        'estimatedPortions': value['estimatedPortions'],
        'description': value['description'],
        'pickupPlace': value['pickupPlace'],
        'address': value['address'],
        'pickupInstructions': value['pickupInstructions'],
        'availableFrom': value['availableFrom'],
        'availableTo': value['availableTo'],
        'contactName': value['contactName'],
        'contactPhone': value['contactPhone'],
        'contactEmail': value['contactEmail'],
        'latitude': value['latitude'],
        'longitude': value['longitude'],
        'additionalNotes': value['additionalNotes'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
        'booking': BookingToJSON(value['booking']),
    };
}

