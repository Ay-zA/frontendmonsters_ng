interface ILicense {
  title: string;
  icon?: string;
  about?: string;
}

export class License {
  public title: string;
  public icon: string;
  public about: string;

  constructor( achievement: ILicense) {
    this.title = achievement.title;
    this.icon = achievement.icon || 'NO ICON';
    this.about = achievement.about || 'NO INFO';
  }
}
