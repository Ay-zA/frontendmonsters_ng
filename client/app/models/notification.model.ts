export enum NotificationType {
  Success,
  Warning,
  Error
}
export interface INotification {
  title: string;
  message: string;
  timeout?: number;
  type: NotificationType;
}
