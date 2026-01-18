import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img src={logo} alt="한입 로그 서비스의 로고." className="w-10" />
        <span className="text-2xl font-bold">한입 로고</span>
      </div>
    </div>
  );
}
