import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator('/login');
  }, []);

  return <div>加载中...</div>;
};

export default Redirect;
