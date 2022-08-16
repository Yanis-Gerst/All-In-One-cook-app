import { useState } from 'react';

const useToogle = (initialValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialValue);

  const toogle = () => {
    setState(state => !state);
  };

  return [state, toogle];
};

export default useToogle;
