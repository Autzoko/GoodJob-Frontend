import { AffairInterface, Plan, Routine } from "../types/AffairTypes";
import { CalendarBox } from "../types/CalendarBox";
import { loadAffairs } from "../storage/AffairStorage";
import { getDateString } from "./DateUtils";

// get plans from affairs
function getPlanFromAffair(affairs: AffairInterface[]): Plan[] {
    return affairs.filter(a => a.type === 'plan') as Plan[];
}
// get routines from affairs
function getRoutineFromAffair(affairs: AffairInterface[]): Routine[] {
    return affairs.filter(a => a.type === 'routine') as Routine[];
}

// get current week's plans
function getCurrentWeekPlans(plans: Plan[], weekDays: Date[]): Plan[] {
    return plans.filter(plan =>
        weekDays.some(date =>
            date.getTime() === plan.date.getTime()
        )
    );
}

// get current week's routines
function getCurrentWeekRoutines(routines: Routine[], weekDays: Date[]): Routine[] {
    return routines.filter(routine =>
        weekDays.some(date => 
            date.getTime() >= routine.startDate.getTime() &&
            date.getTime() <= routine.endDate.getTime()
        )
    );
}

// convert current week's plan to box
function convertPlan2Box(plans: Plan[]): CalendarBox[] {
    const box: CalendarBox[] = plans.map(plan => ({
        id: plan.id,
        title: plan.title,
        content: plan.content,
        date: plan.date,
        startTime: plan.startTime,
        endTime: plan.endTime
    }));
    return box;
}

// convert current week's routine to box
function convertRoutine2Box(routines: Routine[], weekDays: Date[]): CalendarBox[] {
    const box: CalendarBox[] = [];

    routines.forEach(routine => {
        weekDays.forEach(wdate => {
            const day = wdate.getDay();
            if (routine.weekDays.includes(day)) {
                box.push({
                    id: routine.id + day.toString(),
                    title: routine.title,
                    content: routine.content,
                    date: wdate,
                    startTime: routine.startTime,
                    endTime: routine.endTime
                });
            }
        });
    });
    return box;
}

// get current week all boxes
export function getCurrentWeekBoxed(weekDays: Date[]): CalendarBox[] {
    const affairs: AffairInterface[] = loadAffairs();
    let plans: Plan[] = getPlanFromAffair(affairs);
    let routines: Routine[] = getRoutineFromAffair(affairs);

    plans = getCurrentWeekPlans(plans, weekDays);
    routines = getCurrentWeekRoutines(routines, weekDays);

    const planBoxes = convertPlan2Box(plans);
    const routineBoxes = convertRoutine2Box(routines, weekDays);

    return [...planBoxes, ...routineBoxes];
};