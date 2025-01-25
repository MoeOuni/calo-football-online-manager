export interface TSFixMe {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ILog {
  _id: string;
  userId: string;
  action: string;
  createdAt?: Date;
  updatedAt?: Date;
}
