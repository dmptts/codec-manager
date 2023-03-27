import { Link, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../config';
import { useGetCodecQuery } from '../store/codecApi';
import CodecForm from './CodecForm';

export default function CodecEditPage() {
  const { id } = useParams();
  const { data } = useGetCodecQuery(Number(id));

  return (
    <>
      <h1>Страница редактирования кодека {id}</h1>
      <Link to={APP_ROUTES.Main}>Назад</Link>
      <CodecForm data={data} />
    </>
  );
}
