/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIFeatures } from '@/utils/api-features';
import { Request } from 'express';

export class FactoryService {
  Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  public getAll = async (req: Request) => {
    const features = new APIFeatures(this.Model.find(), req.query).search().filter().sort().limitFields().paginate();

    return await features.query;
  };

  public getAllPopulated = async (req: Request, populateObj: { path: string; select: string }) => {
    const features = new APIFeatures(
      this.Model.find().populate({
        ...populateObj,
      }),
      req.query,
    )
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return await features.query;
  };
}
