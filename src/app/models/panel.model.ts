export enum PanelTypes {
  Home = 1,
  Academy
}

interface IPanel {
  name?: string;
  isExpanded?: boolean;
}

interface IPanelButton {
  icon?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  isNew?: boolean;
  overview?: string;
}

export class Panel {
  public name?: string;
  public isExpanded: boolean;

  public toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(panel?: IPanel) {
    this.name = !!panel && !!panel.name ? panel.name : '';
    this.isExpanded = !!panel && typeof panel.isExpanded !== 'undefined' ? panel.isExpanded : true;
  }
}

export class PanelButton {
  public icon?: string;
  public title?: string;
  public subtitle?: string;
  public description?: string;
  public isNew: boolean;
  public overview: string;

  constructor(panel: IPanelButton) {
    this.icon = panel.icon;
    this.title = panel.title;
    this.subtitle = panel.subtitle;
    this.description = panel.description;
    this.isNew = panel.isNew;
    this.overview = panel.overview;
  }
};
