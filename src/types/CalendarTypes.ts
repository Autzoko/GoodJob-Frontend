import { CalendarBox } from "./CalendarBox";
import { getCurrentWeekBoxes } from "../utils/AffairUtils";
import { isSameDay } from "../utils/AffairUtils";

export class CalendarColumn {
    public id: string = "calendar-column-";
    public boxes: CalendarBox[] = [];
    constructor(
        public date: Date,
    ) {}

    getBoxes(): CalendarBox[] {
        return this.boxes;
    }
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

    private getBoxesOfDate(date: Date): CalendarBox[] {
        return this.boxes.filter(box => isSameDay(box.date, date));
    }

    assignColumns() {

    }
};