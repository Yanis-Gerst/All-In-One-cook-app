import { useState } from "react";

const useCounter = (initalValue = 0) => {
  const [count, setCount] = useState(initalValue);

  return [
    count,
    {
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
      reset: () => setCount(initalValue),
    },
  ];
};

export default useCounter;
