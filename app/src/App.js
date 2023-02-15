import { Route, Routes } from "react-router-dom";
import EditParent from "./components/testing";
import Lobby from "./components/Lobby";
import NotFound from "./components/unfound";
import MainMenu from "./components/mainmenu";
import AddNew from "./components/AddNew";
function App() {
  //Routing for the application, it will help with navigating
  //from page to page
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/mainmenu" element={<MainMenu />} />
      <Route path="/New" element={<AddNew />} />
      <Route path="/Edit" element={<EditParent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
