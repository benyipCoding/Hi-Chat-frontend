interface AvatarProps {
  src: string;
  userName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, userName }) => {
  return (
    <div className="bg-blue-300 w-16 sm:w-20 flex rounded-md overflow-hidden">
      <img src={src} alt={userName} className="m-auto" />
    </div>
  );
};

export default Avatar;
