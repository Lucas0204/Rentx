export interface IDateProvider {
    getDiffInHours(start_date: Date, end_date: Date): number;
    dateNow(): Date;
}
