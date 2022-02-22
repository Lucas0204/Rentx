export interface IDateProvider {
    dateNow(): Date;
    getDiffInHours(start_date: Date, end_date: Date): number;
    getDiffInDays(start_date: Date, end_date: Date): number;
}
