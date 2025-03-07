import { CalendarBox } from "./CalendarBox";
import { getCurrentWeekBoxes } from "../utils/AffairUtils";
import { isSameDay } from "../utils/AffairUtils";
import { getCurrentWeekDates } from "../utils/DateUtils";

export class CalendarColumn {
    public id: string = "calendar-column-";
    public boxes: CalendarBox[] = [];
    constructor(
        public date: Date,
    ) {}
};

export class CalendarCanvas {
    public columns: CalendarColumn[] = [];
    public boxes: CalendarBox[] = [];

    constructor(
        public id: string,
        public weekDays: Date[]
    ) {
        this.boxes = getCurrentWeekBoxes(weekDays);
        this.columns = weekDays.map(date => new CalendarColumn(date));
    }

    getNextWeek(): boolean {
        this.weekDays = this.weekDays.map(date => {
            const next = new Date(date);
            next.setDate(next.getDate() + 7);
            return next;
        });

        this.boxes = getCurrentWeekBoxes(this.weekDays);

        this.assignColumns();

        return true;
    }

    getPrevWeek(): boolean {
        this.weekDays = this.weekDays.map(date => {
            const prev = new Date(date);
            prev.setDate(prev.getDate() - 7);
            return prev;
        });

        this.boxes = getCurrentWeekBoxes(this.weekDays);

        return true;
    } 

    private assignColumns(): void {
        if (this.columns.length === 0) {
            for (const date of this.weekDays) {
                const col = new CalendarColumn(date);
                col.boxes = this.boxes.filter(b => isSameDay(b.date, date));
                col.id += date.getDay();
            }
        } else if (this.columns.length === 7){
            let index = 0;
            for (const date of this.weekDays) {
                this.columns[index++].boxes = this.boxes.filter(b => isSameDay(b.date, date));
            }
        } else {
            throw new Error(`Internal error: invalid column length: ${this.columns.length}`);
        }
    }
};