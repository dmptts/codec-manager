import { useState } from 'react';
import { IMethod } from '../types/method';
import MethodForm from './MethodForm';
import styled from 'styled-components';

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
    <Root>
      <Name onClick={handleHeaderClick}>{method?.name}</Name>
      {isOpened && <MethodForm method={method} />}
    </Root>
  );
}

const Root = styled.li``;

const Name = styled.h4`
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 80px;
  padding-right: 20px;

  background-color: #f9f9f9;
  border: 1px solid #e6e6e6;
  cursor: pointer;
`;
