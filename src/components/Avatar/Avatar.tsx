import clsx from 'clsx';

interface AvatarProps {
  src: string;
  userName?: string;
  fixedSize?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  userName,
  fixedSize = false,
}) => {
  return (
    <div
      className={clsx(
        'w-16 sm:w-20 flex rounded-md overflow-hidden',
        !fixedSize && 'lg:w-14'
      )}
    >
      <img src={src} alt={userName} className="m-auto" />
    </div>
  );
};

export default Avatar;
