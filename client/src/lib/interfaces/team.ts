export type TeamStatus = 'complete' | 'draft';

export interface ITeam {
    _id?: string;
    name: string;
    image?: string;
    status?: TeamStatus;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  