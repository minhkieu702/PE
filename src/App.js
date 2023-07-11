import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import FormAddEdit from './components/FormAddEdit';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <ToastContainer position='top-right' autoClose={2000}></ToastContainer>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard'element={<Dashboard/>}></Route>
      <Route path='/add' element={<FormAddEdit/>}></Route>
      <Route path='/update/:id' element={<FormAddEdit/>}></Route>
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
