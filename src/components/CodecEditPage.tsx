import { Link, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../config';

export default function CodecEditPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Страница редактирования кодека</h1>
      <strong>{id}</strong>
      <Link to={APP_ROUTES.Main}>Назад</Link>
    </>
  );
}
