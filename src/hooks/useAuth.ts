import { AuthContext } from '@/context/AuthContext';
import { getUserInfo } from '@/utils/api';
import { ErrorData } from '@/utils/types';
import { useContext, useEffect, useState } from 'react';

export function useAuth() {
  const [loading, setLoading] = useState(true);

  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        updateAuthUser(res.data);
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
