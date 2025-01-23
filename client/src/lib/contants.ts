import { PlayerRole } from "./types";

export const API_STATUS_CODES = {
  SUCCESS: "success",
  CONFLICT: "conflict",
  FAIL: "fail",
};

export const PLAYERS_ROLES = {
  GOALKEEPER: 'goalkeeper',
  DEFENDER: 'defender',
  MIDFIELDER: 'midfielder',
  ATTACKER: 'attacker',
};


export const DEFAULT_PLAYERS: { [key in PlayerRole]: number } = {
  goalkeeper: 3,
  defender: 6,
  midfielder: 6,
  attacker: 5,
};