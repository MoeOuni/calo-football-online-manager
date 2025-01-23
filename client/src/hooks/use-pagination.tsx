import { useQueryStates, parseAsInteger } from 'nuqs'

export function usePagination() {
    return useQueryStates({
        page:  parseAsInteger.withDefault(1),
        per_page: parseAsInteger.withDefault(10),
    })
}