import { CalendarBox } from "../types/CalendarBox";
import { CalendarColumn, CalendarCanvas } from "../types/CalendarTypes";

export function getCurrentDateBoxes(date: Date, canvas: CalendarCanvas): CalendarBox[] {
    return canvas.boxes.filter(b => b.date === date);
}