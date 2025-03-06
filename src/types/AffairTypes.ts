// base class of Plan, Routine, Habit
abstract class Affair {
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public type: 'plan' | 'routine' | 'habit'
    ) {}

    abstract toJSON(): any;
}

export class Plan extends Affair {
    constructor(
        id: string,
        title: string,
        content: string,
        public date: Date,
        public startTime: string,
        public endTime: string
    ) {
        super(id, title, content, 'plan');
    }

    toJSON() {
        return {
            ...this,
            date: this.date.toISOString(),
        };
    }

    static fromJSON(json: any): Plan {
        return new Plan(
            json.id,
            json.title,
            json.content,
            new Date(json.date),
            json.startTime,
            json.endTime
        );
    }
};

export class Routine extends Affair {
    constructor(
        id: string,
        title: string,
        content: string,
        public startDate: Date,
        public endDate: Date,
        public weekDays: number[],
        public startTime: string,
        public endTime: string,
        public ignoredDate: Date[]
    ) {
        super(id, title, content, 'routine');
    }

    toJSON() {
        return {
            ...this,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
        };
    }

    static fromJSON(json: any): Routine {
        return new Routine(
            json.id,
            json.title,
            json.content,
            new Date(json.startDate),
            new Date(json.endDate),
            json.weekDays,
            json.startTime,
            json.endTime,
            json.ignoredDate
        );
    }
};

export class Habit extends Affair {
    constructor(
        id: string,
        title: string,
        content: string,
        public startDate: Date,
        public repeatInterval: number
    ) {
        super(id, title, content, 'habit');
    }

    toJSON() {
        return {
            ...this,
            startDate: this.startDate.toISOString(),
        }
    }

    static fromJSON(json: any): Habit {
        return new Habit(
            json.id,
            json.title,
            json.content,
            new Date(json.startDate),
            json.repeatInterval
        );
    }
};

export type AffairInterface = Plan | Routine | Habit;

