import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../config';
import CodecForm from './CodecForm';

export default function CodecCreatePage() {
  return (
    <>
      <h1>Страница создания кодека</h1>
      <Link to={APP_ROUTES.Main}>Назад</Link>
      <CodecForm />
    </>
  );
}
