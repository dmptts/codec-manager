import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../const';

export default function CodecListPage() {
  return (
    <>
      <h1>Страница списка кодеков</h1>
      <Link to={APP_ROUTES.EditCodec}>Редактирование</Link>
      <Link to={APP_ROUTES.CreateCodec}>Создание</Link>
    </>
  );
}
