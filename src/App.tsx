import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Test from './pages/Test/Test';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Redirect from './pages/Redirect/Redirect';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Redirect />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element={<Test />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
