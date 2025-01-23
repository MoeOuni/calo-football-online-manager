// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const factoryQueryKeys = {
  all: ["factory"],
  details: () => [...factoryQueryKeys.all, "detail"],
  composition: () => [...factoryQueryKeys.all, "composition"],
  teams: () => [...factoryQueryKeys.all, "teams"],
  meTeams: () => [...factoryQueryKeys.all, "me-teams"],
  players: () => [...factoryQueryKeys.all, "players"],
  marketPlayers: () => [...factoryQueryKeys.all, "market-players"],
  detail: (id: string) => [...factoryQueryKeys.details(), id],
};
