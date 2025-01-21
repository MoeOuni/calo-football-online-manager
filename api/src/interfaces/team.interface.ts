export type TeamStatus = 'complete' | 'incomplete';

export interface ITeam {
  name: string;
  image?: string;
  status?: TeamStatus;
}
