const calculateBudgetDetails = ({
    amount,
    spent,
    startDate,
    recurrence,
}: {
    amount: number;
    spent: number;
    startDate: string;
    recurrence: string;
}): { moneyLeft: number; canSpend: number; lastDate: string } => {
    const startPeriod = new Date(startDate);
    let endDate;
    switch (recurrence.toLowerCase()) {
        case 'daily': {
            endDate = new Date(startPeriod.getTime() + 86_400_000);
            break;
        }
        case 'weekly': {
            endDate = new Date(startPeriod.getTime() + 604_800_000);
            break;
        }
        case 'biweekly': {
            endDate = new Date(startPeriod.getTime() + 1_209_600_000);
            break;
        }
        case 'monthly': {
            endDate = new Date(
                startPeriod.getFullYear(),
                startPeriod.getMonth() + 1,
                startPeriod.getDate(),
            );
            break;
        }
        case 'yearly': {
            endDate = new Date(
                startPeriod.getFullYear() + 1,
                startPeriod.getMonth(),
                startPeriod.getDate(),
            );
            break;
        }
        default: {
            endDate = startPeriod;
            break;
        }
    }
    const lastDate = new Date(endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
    const MILLISECONDS_PER_DAY = 86_400_000;
    const timeRemainingMs = endDate.getTime() - Date.now();
    const daysRemaining = Math.ceil(timeRemainingMs / MILLISECONDS_PER_DAY);
    const moneyLeft = amount + spent;
    const canSpend = daysRemaining > 0 ? moneyLeft / daysRemaining : 0;
    return { moneyLeft, canSpend, lastDate };
};

export { calculateBudgetDetails };
