import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function Pagination() {
  const [, setSearchParams] = useSearchParams();

  return (
    <Root>
      <li>
        <button onClick={() => setSearchParams({ _page: '1' })}>1</button>
      </li>
      <li>
        <button onClick={() => setSearchParams({ _page: '2' })}>2</button>
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
