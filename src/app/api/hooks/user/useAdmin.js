// hooks/useAdmin.js
import { useMe } from "./useMe";

export const useAdmin = () => {
  const { user, isLoading } = useMe();
  return {
    user,
    isAdmin: user?.role === "admin",
    isLoading,
  };
};