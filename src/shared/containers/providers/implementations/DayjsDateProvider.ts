import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    getDiffInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = dayjs(start_date).utc().local().format();
        const end_date_utc = dayjs(end_date).utc().local().format();

        return dayjs(end_date_utc).diff(start_date_utc, 'hours');
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}

export { DayjsDateProvider };
