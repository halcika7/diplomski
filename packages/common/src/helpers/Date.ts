export class DateHelper {
  private static instance: DateHelper;

  constructor() {
    if (DateHelper.instance) {
      return DateHelper.instance;
    }

    DateHelper.instance = this;
  }

  private getMonth() {
    return new Date().getMonth();
  }

  get getCurrentMonth() {
    return this.getMonth() + 1;
  }

  get getPreviousMonth() {
    return this.getMonth();
  }

  get getCurrentYear() {
    return new Date().getFullYear();
  }
}
