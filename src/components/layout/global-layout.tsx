import { Link, Outlet } from "react-router";
import { SunIcon } from "lucide-react";

import logo from "@/assets/logo.png";

import ProfileButton from "@/components/layout/header/profile-button";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="h-5"
              src={logo}
              alt="한입 로그의 로고, 메시지 말풍선을 형상화한 모양"
            />
            <div className="font-bold">한입 로그</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @marrydaddy
      </footer>
    </div>
  );
}
