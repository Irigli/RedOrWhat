import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from './components/Form';
import List from './components/List';
import Display from './components/Display';
import Update from './components/Update';
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import AllWines from './components/AllWines';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');


  return (
    <div className="App">
      <BrowserRouter>
      <Header userName={userName}  role={role} setRole={setRole} setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin}/>
        <Routes>

          <Route path='/home' element={<Home isLoggedin={isLoggedin} userName={userName} role={role}/>}/>
          <Route path='/edit/:id' element={<Update/>}/>
          <Route path='/wine/:id' element={<Display/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/wines' element={<AllWines isLoggedin={isLoggedin}/>}/>
          <Route path='/register' element={<Register setIsLoggedin={setIsLoggedin}/>}/>
          <Route path='/login' element={<Login setUserName={setUserName} isLoggedin={isLoggedin} setRole={setRole} setIsLoggedin={setIsLoggedin}/>}/>
          <Route path='/add' element={<Form/>}/>
          <Route path='/list' element={<List/>}/>
        </Routes>      
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
