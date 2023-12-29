import { Image } from 'antd';
import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  userName?: string;
  fixedSize?: boolean;
  style?: React.CSSProperties;
  avatarScale?: boolean;
}

export const defaultAvatar = '/images/avatar/2.jpeg';

const Avatar: React.FC<AvatarProps> = ({
  src = defaultAvatar,
  userName,
  fixedSize = false,
  style,
  avatarScale = false,
}) => {
  return (
    <div
      className={clsx(
        'w-16 sm:w-20 flex rounded-md relative overflow-hidden flex-shrink-0',
        !fixedSize && 'lg:w-14'
      )}
      style={style}
    >
      {avatarScale ? (
        <Image src={src} className="m-auto" alt={userName} />
      ) : (
        <img src={src} alt={userName} className="m-auto" />
      )}
    </div>
  );
};

export default Avatar;
