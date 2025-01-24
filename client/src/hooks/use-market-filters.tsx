import { useQueryStates, parseAsString } from 'nuqs'

export function useMarketFilter() {
    return useQueryStates({
        name: parseAsString.withDefault(''),
        team: parseAsString.withDefault(''),
        role: parseAsString.withDefault(''),
    })
}