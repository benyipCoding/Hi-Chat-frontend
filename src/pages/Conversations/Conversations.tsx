import { useEffect } from 'react';

const Conversations = () => {
  useEffect(() => {
    console.log('conversation page mounted');
  }, []);

  return (
    <>
      <div className="rounded-md bg-[#0000005e] h-[80%] p-2">Screen</div>
      <div className="rounded-md bg-[#0000005e] h-[20%] p-2">Input</div>
    </>
  );
};

export default Conversations;
