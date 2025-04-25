import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import { store } from './store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </Provider>
  );
}

export default App;
