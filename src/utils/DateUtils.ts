// get dates of current week
export function getCurrentWeekDates(baseDate: Date): Date[] {
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());

    return Array.from({ length: 7}, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });
};

// ISOS conversion
export function getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
};