import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../../../../../libs/queryKeys";
import { userService } from "../../services/userService";

// Logged-in user ko cookie se fetch karta hai (page refresh pe bhi kaam karta hai)
export const useMe = () => {
  const query = useQuery({
    queryKey: userKeys.me(),
    queryFn: userService.me,
    retry: false, // 401 pe baar baar retry nahi
    staleTime: 5 * 60 * 1000,
  });

  return {
    user: query.data ?? null,
    isLoggedIn: !!query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};