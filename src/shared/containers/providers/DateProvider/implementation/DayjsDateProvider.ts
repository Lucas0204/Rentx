import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }

    getDiffInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = dayjs(start_date).utc().local().format();
        const end_date_utc = dayjs(end_date).utc().local().format();

        return dayjs(end_date_utc).diff(start_date_utc, 'hours');
    }

    getDiffInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = dayjs(start_date).utc().local().format();
        const end_date_utc = dayjs(end_date).utc().local().format();

        return dayjs(end_date_utc).diff(start_date_utc, 'days');
    }

    addDays(days: number): Date {
        return dayjs().add(days, 'day').toDate();
    }
    
    addHours(hours: number): Date {
        return dayjs().add(hours, 'hour').toDate();
    }

    verifyIfExpires(expires_date: Date, date_to_compare: Date): boolean {
        return dayjs(date_to_compare).isAfter(expires_date);
    }
}

export { DayjsDateProvider };
