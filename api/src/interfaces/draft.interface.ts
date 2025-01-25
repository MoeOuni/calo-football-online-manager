export interface IDraft {
  _id?: string;
  type: string;
  metaJSON: any;
  path?: string;
  idUser?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
