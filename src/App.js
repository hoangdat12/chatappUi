import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider} from 'react-redux';

import store from './redux/store';

import PrivateRoute from './utils/PrivateRoute';
import PageCover from './pages/pageCover/PageCover';
import Login from './pages/login/Login';
import ActiveAccount from './pages/activaAccount/ActiveAccount'
import Home from './pages/home/Home'
import Messenge from './pages/messenge/Messenge';
import MyProfile from './pages/profile/MyProfile';
import Profile from './pages/profile/Profile';
import Setting from './pages/setting/Setting';
import Search from './pages/search/Search';
import Friend from './pages/friend/Friend'

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/messenges/:id/:userchat' element={<Messenge />} />
              <Route path='/profile' element={<MyProfile />} />
              <Route path='/profile/:pId' element={<Profile />} />
              <Route path='/setting/:key' element={<Setting />} />
              <Route path='/friends' element={<Friend />} />
              <Route path='/search/:keyword' element={<Search />} />
            </Route>
            <Route path='' element={<PageCover />}/>
            <Route path='/page/:log' element={<Login />} />
            <Route path='/:uid/:token' element={<ActiveAccount />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
  );
}

export default App;
