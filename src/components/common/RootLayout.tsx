import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header>
        <h1 className="py-4 my-5 text-5xl font-bold text-center ">
          Shark Game
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="py-4 mt-10 text-center">
        <p>현재 페이지는 PC Chrome 브라우저 환경에 최적화 되어있습니다.</p>
      </footer>
    </>
  );
};

export default RootLayout;
