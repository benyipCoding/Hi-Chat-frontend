import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  userName?: string;
  fixedSize?: boolean;
  style?: React.CSSProperties;
}

export const defaultAvatar = '/images/avatar/2.jpeg';

const Avatar: React.FC<AvatarProps> = ({
  src = defaultAvatar,
  userName,
  fixedSize = false,
  style,
}) => {
  return (
    <div
      className={clsx(
        'w-16 sm:w-20 flex rounded-md relative overflow-hidden',
        !fixedSize && 'lg:w-14'
      )}
      style={style}
    >
      <img src={src} alt={userName} className="m-auto" />
    </div>
  );
};

export default Avatar;
