import { getTestNormal, getTestSSE } from '@/utils/api';
import React from 'react';

const Test = () => {
  const normal = async () => {
    const res = await getTestNormal();
    console.log(res);
  };

  const sse = async () => {
    const res = await getTestSSE();
    console.log(res);
  };

  return (
    <div>
      <button onClick={normal}>普通输出</button>
      <br />
      <button onClick={sse}>流式输出</button>
    </div>
  );
};

export default Test;
