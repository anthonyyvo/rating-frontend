
import {
  Route,
  Routes
} from "react-router-dom";
import { DataContextProvider } from "./context/dataContext/dataContext";
import { LangContextProvider } from "./context/languageContext/langContext";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="app">
      <LangContextProvider>
        <DataContextProvider>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />

            </Route>
            <Route path='/admin'>
              <Route index element={<Admin />} />

            </Route>
          </Routes>
        </DataContextProvider>
      </LangContextProvider>


    </div>
  );
}

export default App;
