export class FechaUtilidades {
  constructor() {

  }

  public getMaxMinDate(): string {
    let maxMinDate: string;
    const today = new Date();

    if (today.getMonth() + 1 < 10) {
      maxMinDate = today.getFullYear() + '-' + '0' + (today.getMonth() + 1);
    } else {
      maxMinDate = today.getFullYear() + '-' + (today.getMonth() + 1);
    }

    if (today.getDate() < 10) {
      maxMinDate = maxMinDate + '-' + '0' + today.getDate();
    } else {
      maxMinDate = maxMinDate + '-' + today.getDate();
    }
    return maxMinDate;
  }

  public isMajorDate(dateEndEv: Date, dateStartEv: Date): boolean {
    return (dateEndEv < dateStartEv) ?  true :  false;
  }
}
