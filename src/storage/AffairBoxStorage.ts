import { AffairBox, parseAffairBox } from "../types/AffairBox";

const STORAGE_KEY = "boxaff";

export function saveAffairBox(box: AffairBox) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(box));
};

export function loadAffairBoxes(): AffairBox[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsedArray = JSON.parse(raw);
    
    if (Array.isArray(parsedArray)) {
        return parsedArray.map(parseAffairBox);
    } else if (parsedArray && typeof parsedArray === 'object') {
        return [parseAffairBox(parsedArray)];
    } else {
        return [];
    }
    return parsedArray.map(parseAffairBox);
}