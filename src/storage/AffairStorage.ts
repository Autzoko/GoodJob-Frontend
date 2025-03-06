import { parse } from "path";
import { AffairInterface, Plan, Routine, Habit } from "../types/AffairTypes";

const STORAGE_KEY = 'affairs';

export function saveAffairs(affairs: AffairInterface[]) {
    const serialized = affairs.map(a => a.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

export function loadAffairs(): AffairInterface[] {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (!jsonData) return [];

    const parsedData = JSON.parse(jsonData);
    return parsedData.map(parseAffair);
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