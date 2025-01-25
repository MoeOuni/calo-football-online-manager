export interface IDraft {
    _id?: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metaJSON: any;
    path?: string;
    idUser?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  