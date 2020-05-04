export class UtilAutoGestionAfiliados {
  constructor() {
  }

  public isSelectedRule(rules: Object[]): boolean {
    let isSelected = false;
    for (const rule of rules) {
      if (rule['habilitado']) {
        isSelected = true;
        break;
      }
    }
    return isSelected;
  }

  containExtPhoto(ext: string) {
    const allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    return allowedExtensions.exec(ext);
  }
}
