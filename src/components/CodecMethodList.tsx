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
      <List>
        {methods?.map((method, i) => (
          <CodecMethodItem key={i} method={method} opened />
        ))}
      </List>
      <button onClick={handleAddButtonClick}>Добавить метод</button>
    </Root>
  );
}

const Root = styled.div``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  margin: 0;
  padding: 0;

  list-style: none;
`;
