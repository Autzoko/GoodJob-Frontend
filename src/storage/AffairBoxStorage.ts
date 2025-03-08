import { AffairBox, parseAffairBox } from "../types/AffairBox";

const STORAGE_KEY = "boxaff";

export function saveAffairBox(box: AffairBox) {
    const stored = localStorage.getItem(STORAGE_KEY);
    let boxes: AffairBox[] = [];
    if (stored) {
        try {
            boxes = JSON.parse(stored);
            if (!Array.isArray(boxes)) {
                boxes = [];
            }
        } catch (error) {
            console.error("Parse affair box error: ", error);
            boxes = [];
        }
    }
    boxes.push(box);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
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
};

export function deleteAffairBox(id: string): boolean {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) return false;
    
    let affairsBoxes: any[];
    
    try {
        affairsBoxes = JSON.parse(data);
    } catch (error) {
        console.log("Error occurs when delete: function deleteAffair");
        return false;
    }
    
    if (!Array.isArray(affairsBoxes)) {
        affairsBoxes = [affairsBoxes];
    }
    
    const updatedAffairs = affairsBoxes.filter(plan => plan.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAffairs));
    return true;
};