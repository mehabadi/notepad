export class Alert {
  constructor(
    public message: string,
    public type: AlertTypes
  ) {}
}

export enum AlertTypes {
  SUCCESS = 'success',
  DANGER  = 'danger',
  INFO    = 'info',
  WARNING = 'warning'
}
