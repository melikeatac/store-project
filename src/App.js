import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './page/Home';
import { Bill } from './page/Bill';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
