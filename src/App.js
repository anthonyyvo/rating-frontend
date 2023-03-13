
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import List from "./component/admin/list/List";
import Single from "./component/admin/single/Single";
import { DataContextProvider } from "./context/dataContext/dataContext";
import { LangContextProvider } from "./context/languageContext/langContext";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { LoginContext, LoginContextProvider } from "./context/loginContext/Context";
import { useContext } from "react";
import NotFound from "./pages/notfound/NotFound";
import Time from "./component/admin/time/Time";
import { SendDataContextProvider } from "./context/sendDataContext/SendDataContext";
import Profile from "./component/admin/profile/Profile";

function App() {
  const {user} = useContext(LoginContext);
 
  return (
    <div className="app">
    <LoginContextProvider>
    <LangContextProvider>
    <SendDataContextProvider>

        <DataContextProvider>
          <Routes>
            <Route path='/'>
              <Route index element={user ? <Home /> : <Navigate to="/login" /> } />
              <Route path="login" element={<Login />} />


            </Route>
            <Route path='*' element={<NotFound />}/>
            <Route path='/admin'>
              <Route index element={user ? <Admin /> : <Navigate to="/login" /> } />
              <Route path='list' element={user ? <List /> : <Navigate to="/login" /> } />
              <Route path='q7' element={user ? <List location={7} /> : <Navigate to="/login" /> } />
              <Route path='q1' element={user ? <List location={1} /> : <Navigate to="/login" /> } />
              <Route path='time' element={user ? <Time /> : <Navigate to="/login" /> } />
              <Route path='profile' element={user ? <Profile /> : <Navigate to="/login" /> } />


              <Route path="rating">
                <Route path=':userId' element={user ? <Single /> : <Login />} />

              </Route>
              
            </Route>
          </Routes>
        </DataContextProvider>
        </SendDataContextProvider>

      </LangContextProvider>
    </LoginContextProvider>
      


    </div>
  );
}

export default App;
