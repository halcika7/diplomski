export class NumberHelper {
  private static instance: NumberHelper;

  constructor() {
    if (NumberHelper.instance) {
      return NumberHelper.instance;
    }

    NumberHelper.instance = this;
  }

  number(num: number) {
    return Number(`${Math.round(num + (('e+2' as unknown) as number))}e-2`);
  }

  getTwoDigitNumber(num: number, min = 2, max = 2) {
    return this.number(num).toLocaleString(undefined, {
      maximumFractionDigits: max,
      minimumFractionDigits: min,
    });
  }
}
