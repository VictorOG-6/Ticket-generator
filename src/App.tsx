import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Events } from "./pages";

function App() {
  return (
    <div className="pb-[100px]">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-5 pt-[102px]">
        <Routes>
          <Route path="/" element={<Events />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
