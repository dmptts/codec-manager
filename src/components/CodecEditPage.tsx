import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../const';

export default function CodecEditPage() {
  return (
    <>
      <h1>Страница редактирования кодека</h1>
      <Link to={APP_ROUTES.Main}>Назад</Link>
    </>
  );
}
