import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export function getPersister() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return createSyncStoragePersister({
    storage: window.localStorage,
  });
}