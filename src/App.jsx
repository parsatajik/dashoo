import { NeurosityProvider } from "./contexts/NeurosityContext";
import ThemeToggle from "./components/ThemeToggle";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import POUYA from "./assets/pouya.png";

function App() {
  return (
    <NeurosityProvider>
      <div className="justify-between bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-screen h-screen flex flex-col mx-auto p-8">
        <div className="flex justify-between mb-4 items-center">
          <a className="text-2xl font-bold" href="/">
            Dashoo
          </a>
          <div className="flex items-center justify-center">
            <ThemeToggle />
            <div className="divider divider-horizontal" />
            <div className="avatar hover:cursor-pointer">
              <div
                className="w-14 rounded-full"
                onClick={() => (document.location.href = "/profile")}
              >
                <img src={POUYA} className="object-fit" />
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </NeurosityProvider>
  );
}

export default App;
