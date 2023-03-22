import { useSearchParams } from 'react-router-dom';

export default function Pagination() {
  const [, setSearchParams] = useSearchParams();

  return (
    <ul>
      <li>
        <button onClick={() => setSearchParams({ _page: '1' })}>1</button>
      </li>
      <li>
        <button onClick={() => setSearchParams({ _page: '2' })}>2</button>
      </li>
    </ul>
  );
}
