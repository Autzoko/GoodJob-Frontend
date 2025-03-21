import { parse } from "path";
import { AffairInterface, Plan, Routine, Habit } from "../types/AffairTypes";

const STORAGE_KEY = 'affairs';

export function saveAffairs(affair: AffairInterface) {
    const stored = localStorage.getItem(STORAGE_KEY);
    let affairs: AffairInterface[] = [];
    if (stored) {
        try {
            affairs = JSON.parse(stored);
            console.log(affairs);
            if (!Array.isArray(affairs)) {
                affairs = [];
            }
        } catch (error) {
            console.error('Parse affairs error: ', error);
            affairs = [];
        }
    }
    affairs.push(affair.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(affairs));
}

export function loadAffairs(): AffairInterface[] {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (!jsonData) return [];

    const parsedData = JSON.parse(jsonData);
    if (Array.isArray(parsedData)) {
        return parsedData.map(parseAffair);
    } else if (parsedData && typeof parsedData === 'object') {
        return [parseAffair(parsedData)];
    } else {
        return [];
    }
}

export function deleteAffair(id: string): boolean {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return false;

    let affairs: any[];

    try {
        affairs = JSON.parse(data);
    } catch (error) {
        console.log("Error occurs when delete: function deleteAffair");
        return false;
    }

    if (!Array.isArray(affairs)) {
        affairs = [affairs];
    }

    const updatedAffairs = affairs.filter(plan => plan.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAffairs));
    return true;
}

function parseAffair(json: any): AffairInterface {
    switch (json.type) {
        case 'plan':
            return Plan.fromJSON(json);
        case 'routine':
            return Routine.fromJSON(json);
        case 'habit':
            return Habit.fromJSON(json);
        default:
            throw new Error(`Unknown affair type: ${json.type}`);
    }
}