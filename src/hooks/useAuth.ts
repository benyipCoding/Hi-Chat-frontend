import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';
import { getUserInfo } from '@/utils/api';
import { ErrorData } from '@/utils/types';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const location = useLocation();
  const controller = new AbortController();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        updateAuthUser(res.data);
        if (location.state === '/login') {
          toast.success(`Welcom ${res.data?.name}`);
        }
      })
      .catch((err: ErrorData) => {
        console.log(err.data);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}
