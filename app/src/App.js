import { Route, Routes } from "react-router-dom";
import Edits from "./components/Edits";
import Lobby from "./components/Lobby";
import NotFound from "./components/unfound";
import MainMenu from "./components/mainmenu";
function App() {
  //Routing for the application, it will help with navigating
  //from page to page
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/mainmenu" element={<MainMenu />} />
      <Route path="/Edit" element={<Edits />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
