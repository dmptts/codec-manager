import { useState } from 'react';
import { IMethod } from '../types/method';
import MethodForm from './MethodForm';

interface ICodecMethodItem {
  method?: IMethod;
  opened?: boolean;
}

export default function CodecMethodItem({
  method,
  opened = false,
}: ICodecMethodItem) {
  const [isOpened, setIsOpened] = useState(opened);

  const handleHeaderClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <li>
      <div onClick={handleHeaderClick}>
        <h3>{method?.name}</h3>
      </div>
      {isOpened && <MethodForm method={method} />}
    </li>
  );
}
