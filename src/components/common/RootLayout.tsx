import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header>
        <h1>Shark Game</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
