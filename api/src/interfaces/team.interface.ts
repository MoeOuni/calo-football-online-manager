export type TeamStatus = 'complete' | 'incomplete';

export interface ITeam {
  _id?: string;
  name: string;
  image?: string;
  status?: TeamStatus;
}
