import Profile from '@/components/Profile/Profile';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-2">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
