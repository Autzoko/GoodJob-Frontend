import { AffairBox } from "../types/AffairBox";
import { CalendarBox } from "../types/CalendarBox";
import { loadAffairBoxes } from "../storage/AffairBoxStorage";

export function getBoxColor(box: CalendarBox): string {
    const id = box.id;
    console.log(id);
    const affairBoxes = loadAffairBoxes();

    const targetBox = affairBoxes.filter(a => a.id === id);

    console.log(targetBox);
    
    if (!targetBox) {
        throw new Error(`Unknown calendar box id: ${id}`);
    }
    
    if (targetBox.length > 1) {
        throw new Error(`Id must be unique`);
    }

    return targetBox[0].color;
}