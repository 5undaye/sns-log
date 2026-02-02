import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetchProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={profile.avatar_url || defaultAvatar}
        className="h-30 w-30 rounded-full object-cover"
      />

      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-bold">{profile.nickname}</span>
        <span className="text-muted-foreground">{profile.bio}</span>
      </div>
    </div>
  );
}
