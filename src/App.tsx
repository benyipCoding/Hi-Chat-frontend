import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Test from './pages/Test/Test';
// import { ConfigProvider } from 'antd';

// function AppWithProvider() {}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
