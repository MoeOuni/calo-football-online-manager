import { QueryClient } from "@tanstack/react-query";

// Centralized state for last triggered query key
const lastTriggeredQueryKey: string[][] = [];

// Get the last triggered query key
export const getLastTriggeredQueryKey = () => lastTriggeredQueryKey;

// Function to listen to query events
export const setupQueryKeyTracker = (queryClient: QueryClient) => {
  queryClient.getQueryCache().subscribe((event) => {
    if (event?.query) {
      lastTriggeredQueryKey.push(event.query.queryKey); // Update the last triggered key
    }
  });
};
