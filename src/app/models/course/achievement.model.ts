interface IAchievement {
  title: string;
  icon?: string;
  about?: string;
}

export class Achievement {
  public title: string;
  public icon: string;
  public about: string;

  constructor( achievement: IAchievement) {
    this.title = achievement.title;
    this.icon = achievement.icon || 'NO ICON';
    this.about = achievement.about || 'NO INFO';
  }
}
