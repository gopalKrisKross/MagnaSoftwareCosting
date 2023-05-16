import * as moment from 'moment';

export class CommonFun {
  constructor() {}

  public static formatDate(iFormat: string, iDate: string | Date): any {
    try {
      if (iDate instanceof Date || typeof iDate == 'string') {
        return moment(iDate).format(iFormat);
      } else {
        let d = new Date(iDate);
        if (d instanceof Date && !isNaN(d.getTime())) {
          return moment(d).format(iFormat);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
