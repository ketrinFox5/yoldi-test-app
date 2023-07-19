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
import Users from './pages/Users';
import { ILogIn } from './interfaces/ILogIn';
import { loginUser, signUpUser } from './services/authService';
import { useEffect } from 'react';
import { getProfileUser } from './services/profleService';
import { getUserBySlug } from './services/userService';
import { ISignUp } from './interfaces/ISignUp';
import { setSignOut, setUser } from './store/user/user.slice';
import { setPathAccount, setPathAccountGuest, setPathLogin } from './store/path/path.slice';
import { setError } from './store/error/error.slice';
import { setGuest } from './store/guest/guest.slice';
import { setIsOwner } from './store/owner/isOwner.slice';
import { setIsLoading } from './store/loading/isLoading.slice';
import { useAppDispatch, useAppSelector } from './store/store';

function App() {
  // const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('user-value'));

  const navigate = useNavigate();
  const match = useMatch("/account/:slug");
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const signOutState = useAppSelector(state => state.user.isSignOut);
  
  const login = (userData: ILogIn) => {
    loginUser(userData).then(data => {
      if ('message' in data) {
        dispatch(setError(data.message));
      }
      if ('value' in data) {
        setToken(data.value);
        localStorage.setItem('user-value', data.value);
        dispatch(setSignOut(false));
        navigate('/account');
      }
    })
  }

  const signUp = (userData: ISignUp) => {
    signUpUser(userData).then(data => {
      if ('message' in data) {
        dispatch(setError(data.message));
      }
      if ('value' in data) {
        setToken(data.value);
        localStorage.setItem('user-value', data.value);
        dispatch(setSignOut(false));
        navigate('/account');
      }
    })
  }

  const getUserInfo = (token: string) => {
    getProfileUser(token).then(data => {
      if ('message' in data) {
          dispatch(setError(data.message));
      } else {
          dispatch(setError(null));
          dispatch(setUser(data));
          dispatch(setPathAccount());
      }
    })
  }

  const getGuestInfo = (slug: string) => {
    dispatch(setIsLoading(true));
    getUserBySlug(slug).then(data => {
      if ('message' in data) {
        dispatch(setError(data.message));
      } else {
        dispatch(setError(null));
        dispatch(setGuest(data));
        dispatch(setPathAccountGuest(data.slug));
      }
      dispatch(setIsLoading(false));
    })
  }

  const signOut = () => {
    setToken(null);
    localStorage.removeItem('user-value');
    dispatch(setUser(null));
    dispatch(setPathLogin());
    dispatch(setError(null));
    navigate('/login');
  }

  useEffect(() => {
    if(token) {
        getUserInfo(token);
      dispatch(setIsOwner(true));
    }
  }, [token]);

  useEffect(() => {
    if (signOutState) {
      signOut();
    }
  }, [signOutState]);

  useEffect(() => {
    if (match?.params?.slug && match?.params?.slug !== user?.slug) {
        getGuestInfo(match?.params?.slug);
        dispatch(setIsOwner(false));
    }
  }, [match?.params?.slug]);

  return (
    <div>
      <Header/>
        <Routes>
          <Route path="/" element={<FormWrapper><Register signUp={signUp}/></FormWrapper>}></Route>
          <Route path="/signup" element={<FormWrapper><Register signUp={signUp}/></FormWrapper>}></Route>
          <Route path="/login" element={<FormWrapper><LogIn login={login}/></FormWrapper>}></Route>
          <Route path="/account" element={<Account/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/account/:slug" element={<Account/>}></Route>
        </Routes>
      {!user && <Footer/>}
    </div>
  );
}

export default App;           