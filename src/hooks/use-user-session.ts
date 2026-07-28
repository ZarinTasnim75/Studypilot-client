"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "../../lib/auth-client";

export function useUserSession() {
  return useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session?.data || null;
    },
    staleTime: 1000 * 60 * 5, // Cache session data for 5 minutes
    retry: false,
  });
}