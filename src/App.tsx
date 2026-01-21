import SessionProvider from "@/provider/session-provider";
import ModalProvider from "@/provider/modal-provider";
import RootRoute from "@/root-rotue";

export default function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}
