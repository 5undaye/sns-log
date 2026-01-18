import SessionProvider from "@/provider/session-provider";
import RootRoute from "@/root-rotue";

export default function App() {
  return (
    <SessionProvider>
      <RootRoute />
    </SessionProvider>
  );
}
