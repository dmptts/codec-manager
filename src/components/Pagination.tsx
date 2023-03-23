import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

export default function Pagination() {
  // TODO: избавиться от константы и реализовать стор для пагинации при переводе на прод
  const TOTAL_PAGES = 10;

  const [, setSearchParams] = useSearchParams();

  return (
    <Root>
      <li>
        <button onClick={() => setSearchParams({ page: '1' })}>1</button>
      </li>
      <li>
        <button onClick={() => setSearchParams({ page: '2' })}>2</button>
      </li>
    </Root>
  );
}

const Root = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;

  list-style: none;
`;
