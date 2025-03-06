import { AffairBox, parseAffairBox } from "../types/AffairBox";

const STORAGE_KEY = "boxaff";

export function saveAffairBoxes(boxes: AffairBox[]) {
    const serialized = boxes.map(b => b.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
};

export function loadAffairBoxes(): AffairBox[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsedArray = JSON.parse(raw);
    return parsedArray.map(parseAffairBox);
}