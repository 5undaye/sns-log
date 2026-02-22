import { useEffect, type ReactNode } from "react";

import supabase from "@/lib/supabase";

import GlobalLoader from "@/components/global-loader";

import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useProfileData } from "@/hooks/queries/use-profile-data";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isLoading: isProfileLoading } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
