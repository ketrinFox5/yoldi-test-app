import Footer from './components/Footer/index';
import FormWrapper from './components/FormWrapper/index';
import Header from './components/Header/index';
import Register from './pages/Register/index';
import LogIn from './pages/LogIn/index';
import {
  Route, Routes, useMatch, useNavigate,
} from "react-router-dom";
import { useState } from 'react';
import Account from './pages/Account';
import { IProfile } from './interfaces/IProfile';
import Users from './pages/Users';
import { ILogIn } from './interfaces/ILogIn';
import { loginUser, signUpUser } from './services/authService';
import { useEffect } from 'react';
import { getProfileUser } from './services/profleService';
import { getUserBySlug } from './services/userService';
import { ISignUp } from './interfaces/ISignUp';

function App() {
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [guestInfo, setGuestInfo] = useState<IProfile | null>(null);
  const [path, setPath] = useState(window.location.pathname.toString());
  const [token, setToken] = useState(localStorage.getItem('user-value'));
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const match = useMatch("/account/:slug");
  
  const login = (userData: ILogIn) => {
     loginUser(userData).then(data => {
      if ('message' in data) {
        setError(data.message);
      }
      if ('value' in data) {
        setToken(data.value);
        localStorage.setItem('user-value', data.value);
        navigate('/account');
      }
    })
  }

  const signUp = (userData: ISignUp) => {
    signUpUser(userData).then(data => {
      if ('message' in data) {
        setError(data.message);
      }
      if ('value' in data) {
        setToken(data.value);
        localStorage.setItem('user-value', data.value);
        navigate('/account');
      }
    })
  }

  const getUserInfo = (token: string) => {
    getProfileUser(token).then(data => {
      if ('message' in data) {
          setError(data.message);
      } else {
           setProfileData(data);
           setPath('/account');
      }
    })
  }

  const getGuestInfo = (slug: string) => {
    setIsLoading(true);
    getUserBySlug(slug).then(data => {
      if ('message' in data) {
        setError(data.message);
      } else {
         setGuestInfo(data);
      }
      setIsLoading(false);
    })
  }

  const signOut = () => {
    setToken(null);
    localStorage.removeItem('user-value');
    setProfileData(null);
    setPath('/login');
    setError('');
    navigate('/login');
  }

  useEffect(() => {
    if(token) {
      getUserInfo(token);
      setIsOwner(true);
    }
  }, [token]);

  useEffect(() => {
    if (match?.params?.slug && match?.params?.slug !== profileData?.slug) {
        getGuestInfo(match?.params?.slug);
        setIsOwner(false);
    }
  }, [match?.params?.slug]);

  return (
    <div>
      <Header url={path} userData={profileData}/>
        <Routes>
          <Route path="/" element={<FormWrapper><Register signUp={signUp} error={error}/></FormWrapper>}></Route>
          <Route path="/signup" element={<FormWrapper><Register signUp={signUp} error={error}/></FormWrapper>}></Route>
          <Route path="/login" element={<FormWrapper><LogIn login={login} error={error}/></FormWrapper>}></Route>
          <Route path="/account" element={<Account profileData={profileData} isOwner={isOwner} signOut={signOut} isLoading={isLoading}/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/account/:slug" element={<Account profileData={guestInfo} isOwner={isOwner} signOut={signOut} isLoading={isLoading}/>}></Route>
        </Routes>
      {!profileData && <Footer path={path}/>}
    </div>
  );
}

export default App;
