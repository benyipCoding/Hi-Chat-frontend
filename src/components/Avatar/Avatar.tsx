import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  userName?: string;
  fixedSize?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src = '/images/avatar/2.jpeg',
  userName,
  fixedSize = false,
}) => {
  return (
    <div
      className={clsx(
        'w-16 sm:w-20 flex rounded-md relative overflow-hidden',
        !fixedSize && 'lg:w-14'
      )}
    >
      <img src={src} alt={userName} className="m-auto h-[100%]" />
    </div>
  );
};

export default Avatar;
