import styled from 'styled-components';
import { IMethod } from '../types/method';
import CodecMethodItem from './CodecMethodItem';

interface ICodecMethodListProps {
  methods?: IMethod[];
}
export default function CodecMethodList({ methods }: ICodecMethodListProps) {
  const handleAddButtonClick = () => {};

  return (
    <Root>
      <ul>
        {methods?.map((method, i) => (
          <CodecMethodItem key={i} method={method} opened />
        ))}
      </ul>
      <button onClick={handleAddButtonClick}>Добавить метод</button>
    </Root>
  );
}

const Root = styled.div``;
