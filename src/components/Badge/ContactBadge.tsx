import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface ContactBadgeProps {
  index: number;
  badgeCount: number;
}

const ContactBadge: React.FC<ContactBadgeProps> = ({ index, badgeCount }) => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const items = document.querySelectorAll('.ant-collapse-item');
    setX(items[index].getBoundingClientRect().x + 10);
    setY(items[index].getBoundingClientRect().y - 108);
  }, []);

  return (
    <div
      className={clsx(
        'absolute w-5 h-5 bg-rose-600 flex justify-center items-center border rounded-full',
        badgeCount === 0 && 'hidden'
      )}
      style={{
        right: `${x}px`,
        top: `${y}px`,
      }}
    >
      {badgeCount}
    </div>
  );
};

export default ContactBadge;
