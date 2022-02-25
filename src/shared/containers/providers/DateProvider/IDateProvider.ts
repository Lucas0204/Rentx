export interface IDateProvider {
    dateNow(): Date;
    getDiffInHours(start_date: Date, end_date: Date): number;
    getDiffInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    verifyIfExpires(expires_date: Date, date_to_compare: Date): boolean;
}
