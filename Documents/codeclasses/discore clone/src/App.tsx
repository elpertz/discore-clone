import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import ServerDynamic from "./pages/ServerDynamic";
import Home from "./pages/Home";
import { ServerNav } from "./components/ServerNav";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="flex h-dvh bg-gray-700 text-gray-100">
      <ServerNav />

      {/* Routes  */}
      <Routes>
        {/* Route with channel selected */}
        <Route path="/:serverSlug/:channelName" element={<ServerDynamic />} />
        {/* Route with server selected */}
        <Route path="/:serverSlug" element={<ServerDynamic />} />
        {/* Route home with channel selected */}
        <Route path="/:channelName" element={<Home />} />
        {/* Route home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
