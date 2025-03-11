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

export function getAffairBoxById(id: string):AffairBox {
    const boxes: AffairBox[] = loadAffairBoxes();
    const targetAffairBox = boxes.filter(b => b.id === id);

    if (!targetAffairBox) {
        throw new Error("Cannot find target affair box");
    }

    if (targetAffairBox.length > 1) {
        throw new Error("Affair box id is not unique");
    }

    return targetAffairBox[0];
}