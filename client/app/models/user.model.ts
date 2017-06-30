import { Achievement, License } from './course';

export enum UserStatus {
  UnSaved = -1,
  Unverified = 0,
  Verified = 1
}

export enum Roles {
  Student = 0,
  Master,
  Admin
}

interface IUser {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
  courses?: any[];
  experience?: number;
  level?: number;
  courseTitles?: string[];
  achievements?: Achievement[];
  licenses?: License[];
  role: Roles;
  status?: UserStatus;
  settings?: any[];
  $editMode: boolean;
}
export class User {
  public _id: string;
  public email: string;
  private _name: string;
  public password: string;
  public courses: Array<string>;
  public experience: number;
  public level: number;
  public achievements: Achievement[];
  public licenses: License[];
  public courseTitles: string[];
  public role: Roles;
  public date: Date;
  public status: UserStatus;
  public settings: any[];
  public $editMode: boolean;
  public get name() {
    return this._name || this.extractFromEmail();
  }
  public set name(value) {
    this._name = value;
  }

  public get statusName() {
    switch (this.status) {
      case UserStatus.UnSaved:
        return 'UnSaved';
      case UserStatus.Unverified:
        return 'Unverified';
      case UserStatus.Verified:
        return 'Verified';
    }
  }

  public get dateString(): string {
    return this.formatDate(this.date);
  }

  constructor(user?: IUser | any) {
    if (!user) {
      return;
    }

    this._id = user._id || null;
    this.email = user.email || '';
    this.name = user.name || this.extractFromEmail();
    this.password = user.password || 'SECRET';
    this.courses = user.courses || [];
    this.courseTitles = user.courseTitles || [];
    this.experience = user.experience || 0;
    this.level = user.level || 0;
    this.role = user.role || 0;
    this.achievements = user.achievements || [];
    this.licenses = user.licenses || [];
    this.date = !!this._id ? this.getDateFromId(this._id) : new Date();
    this.status = typeof user.status !== 'undefined' ? user.status : UserStatus.UnSaved;
    this.settings = user.settings || [];
    this.$editMode = typeof user.$editMode !== 'undefined' ? user.$editMode : false;
  }

  getDateFromId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  }

  formatDate(date = new Date()) {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('/');
  }

  extractFromEmail() {
    if (!this.email) { return ''; };
    let name = this.email.split('@')[0];
    return name;
  }
}
