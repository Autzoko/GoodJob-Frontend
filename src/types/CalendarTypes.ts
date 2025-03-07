import { CalendarBox } from "./CalendarBox";
import { getCurrentWeekBoxes } from "../utils/AffairUtils";
import { isSameDay } from "../utils/AffairUtils";
import { v4 as uuidv4 } from "uuid";

export class CalendarColumn {
    public id: string = "calendar-column-";
    public boxes: CalendarBox[] = [];
    constructor(
        public date: Date,
    ) {
        this.id += date.getDay().toString();
    }
};

export class CalendarCanvas {
    public columns: CalendarColumn[] = [];
    public boxes: CalendarBox[] = [];
    public id: string = "calendar-canvas-";

    constructor(
        public weekDays: Date[]
    ) {
        this.boxes = getCurrentWeekBoxes(weekDays);
        this.columns = weekDays.map(date => new CalendarColumn(date));
        this.id += uuidv4();
    }

    getNextWeek(): boolean {

        try {
            this.weekDays = this.weekDays.map(date => {
                const next = new Date(date);
                next.setDate(next.getDate() + 7);
                return next;
            });
        
            this.boxes = getCurrentWeekBoxes(this.weekDays);


            this.assignColumns();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }

    getPrevWeek(): boolean {
        try {
            this.weekDays = this.weekDays.map(date => {
                const prev = new Date(date);
                prev.setDate(prev.getDate() - 7);
                return prev;
            });

            this.boxes = getCurrentWeekBoxes(this.weekDays);

            this.assignColumns();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private assignColumns(): void {
        if (this.columns.length === 0) {
            for (const date of this.weekDays) {
                const col = new CalendarColumn(date);
                col.boxes = this.boxes.filter(b => isSameDay(b.date, date));
                col.id += date.getDay();
                console.log("column === 0");
            }
        } else if (this.columns.length === 7){
            let index = 0;
            for (const date of this.weekDays) {
                this.columns[index].date = date;
                this.columns[index].boxes = this.boxes.filter(b => isSameDay(b.date, date));
                index++;
            }
        } else {
            throw new Error(`Internal error: invalid column length: ${this.columns.length}`);
        }
    }

    onUpdate(week: number): CalendarCanvas {
        this.id = `${this.id.split('-')[0]}-${this.id.split('-')[1]}-${week}`;
        return this;
    }
};