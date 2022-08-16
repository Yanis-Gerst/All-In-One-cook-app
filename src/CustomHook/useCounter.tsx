import { useState } from "react";

//Proprety is an object for min max

interface CounterFeature {
  increment: () => void;
  decrement: () => void;
  setSpecificValue: (num: number) => void;
  reset: () => void;
}
const useCounter = (
  initalValue = 0,
  min: any = null,
  max = Infinity
): [number, CounterFeature] => {
  const [count, setCount] = useState(initalValue);

  return [
    count,
    {
      increment: () => {
        if (!max) {
          setCount((c) => c + 1);
          return;
        }
        if (count + 1 > max) return;
        setCount((c) => c + 1);
      },
      decrement: () => {
        if (!min) {
          setCount((c) => c - 1);
          return;
        }
        if (count - 1 < min) return;
        setCount((c) => c - 1);
      },
      setSpecificValue: (number) => {
        if (number < min || number > max) return;
        setCount(number);
      },
      reset: () => setCount(initalValue),
    },
  ];
};

export default useCounter;
