import Footer from './components/Footer/index';
import FormWrapper from './components/FormWrapper/index';
import Header from './components/Header/index';
import Register from './pages/Register/index';
import LogIn from './pages/LogIn/index';
import {
  Route, Routes, BrowserRouter
} from "react-router-dom";
import { useState } from 'react';
import Account from './pages/Account';
import { IProfile } from './interfaces/IProfile';
import Users from './pages/Users';

function App() {
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [path, setPath] = useState(window.location.pathname.toString());
  return (
    <div className="App">
      <BrowserRouter>
      <Header url={path} userData={profileData}/>
        <Routes>
          <Route path="/" element={<FormWrapper><Register setProfileData={setProfileData}/></FormWrapper>}></Route>
          <Route path="/signup" element={<FormWrapper><Register setProfileData={setProfileData}/></FormWrapper>}></Route>
          <Route path="/login" element={<FormWrapper><LogIn setProfileData={setProfileData} setPath={setPath}/></FormWrapper>}></Route>
          <Route path="/account" element={<Account profileData={profileData} setProfileData={setProfileData}/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/account/:slug" element={<Account profileData={profileData} setProfileData={setProfileData}/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer path={path} profileData={profileData}/>
    </div>
  );
}

export default App;
