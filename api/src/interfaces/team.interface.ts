export type TeamStatus = 'complete' | 'incomplete';

export interface ITeam {
  name: string;
  image?: string;
  members?: string[];
  status?: TeamStatus;
}
