import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header>
        <h1 className=" text-5xl font-bold text-center py-4">Shark Game</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-4 mt-10">
        <p>현재 페이지는 PC Chrome 브라우저 환경에 최적화 되어있습니다.</p>
      </footer>
    </>
  );
};

export default RootLayout;
