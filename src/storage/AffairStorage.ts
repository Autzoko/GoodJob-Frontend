import { parse } from "path";
import { AffairInterface, Plan, Routine, Habit } from "../types/AffairTypes";

const STORAGE_KEY = 'affairs';

export function saveAffairs(affair: AffairInterface) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(affair.toJSON()));
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