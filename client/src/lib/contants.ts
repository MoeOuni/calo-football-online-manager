import { PlayerRole } from "./types";

export const API_STATUS_CODES = {
  SUCCESS: "success",
  CONFLICT: "conflict",
  FAIL: "fail",
};

export const PLAYERS_ROLES = {
  GOALKEEPER: 'Goalkeeper',
  DEFENDER: 'Defender',
  MIDFIELDER: 'Midfielder',
  ATTACKER: 'Attacker',
};


export const DEFAULT_PLAYERS: { [key in PlayerRole]: number } = {
  Goalkeeper: 3,
  Defender: 6,
  Midfielder: 6,
  Attacker: 5,
};