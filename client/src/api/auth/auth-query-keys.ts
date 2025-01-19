// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const authQueryKeys = {
    all: ['auth'],
    details: () => [...authQueryKeys.all, 'detail'],
    detail: (id: string) => [...authQueryKeys.details(), id],
};