export interface Statistics{
    date: Date,
    locationName: string,
    transactions: number,
    revenue: number,
    revenueCurrency: string,
    energyDeliveredKWh: number
};

export interface StatisticsObject{
    stats: Array<Statistics>,
    filter: any,
}