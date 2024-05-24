
import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Mainpage from './components/Mainpage';
import Account from './components/account';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setLoggedInUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    navigateTo('mainpage');
  };

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  const renderHeader = () => {
    if (currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'account') {
      return <Header navigateTo={navigateTo} onLogout={handleLogout} />;
    }
    return null;
  };

  const handleCloseAccount = () => {
    setCurrentPage('mainpage');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {renderHeader()}
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />}
      {currentPage === 'signup' && <Signup navigateTo={navigateTo} />}
      {currentPage === 'mainpage' && <Mainpage navigateTo={navigateTo} />}
      {currentPage === 'account' && <Account user={loggedInUser} onClose={handleCloseAccount} />}
      {currentPage === 'about' && <About/>}
      {currentPage === 'contact' && <Contact />}
    </div>
  );
}

export default App;