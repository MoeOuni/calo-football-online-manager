// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const draftsQueryKeys = {
    all: ['drafts'],
    details: () => [...draftsQueryKeys.all, 'detail'],
    detail: (id: string) => [...draftsQueryKeys.details(), id],
};