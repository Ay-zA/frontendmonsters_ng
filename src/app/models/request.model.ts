interface IRequest {
  _id?: string;
  technology?: string;
  description?: string;
  status?: number;
  date?: Date;
}
export class Request {
  public _id: string;
  public technology: string;
  public description?: string;
  public status: number;
  private date: Date;
  public get dateString(): string {
    return this.formatDate(this.date);
  };

  constructor(request: IRequest) {
    this._id = request._id || '';
    this.technology = request.technology || '';
    this.description = request.description || '';
    this.status = request.status || 0;
    this.date = !!request.date ? new Date(request.date) : new Date();
  }

  formatDate(date = new Date()) {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('/');
  }
}
