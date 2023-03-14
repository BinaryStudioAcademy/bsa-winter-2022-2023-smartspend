type DataObject = { date: string; value: number };
type ChartProperties = {
    income: DataObject[];
    outcome: DataObject[];
};

export { type ChartProperties, type DataObject };
