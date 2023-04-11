function calculateEndDate(startDate: string, type: string): string {
    const date = new Date(startDate);

    switch (type) {
        case 'DAILY': {
            return date.toISOString().slice(0, 10);
        }
        case 'WEEKLY': {
            date.setDate(date.getDate() + 7);
            return date.toISOString().slice(0, 10);
        }
        case 'BIWEEKLY': {
            date.setDate(date.getDate() + 14);
            return date.toISOString().slice(0, 10);
        }
        case 'MONTHLY': {
            date.setMonth(date.getMonth() + 1);
            return date.toISOString().slice(0, 10);
        }
        case 'YEARLY': {
            date.setFullYear(date.getFullYear() + 1);
            return date.toISOString().slice(0, 10);
        }
        default: {
            throw new Error('Invalid type');
        }
    }
}

export { calculateEndDate };
