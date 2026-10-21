import { QueryClient, defaultShouldDehydrateQuery, environmentManager } from "@tanstack/react-query";
import { cache } from "react";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) || query.state.status === "pending",
            },
        },
    });
}

let browserQueryClient;

const getQueryClient = cache(() => {
    if (environmentManager.isServer()) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
});

export { getQueryClient };