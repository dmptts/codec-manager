import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { APP_ROUTES } from '../config';
import CodecCreatePage from './CodecCreatePage';
import CodecEditPage from './CodecEditPage';
import CodecListPage from './CodecListPage';

const router = createBrowserRouter([
  {
    path: APP_ROUTES.Main,
    element: <CodecListPage />,
  },
  {
    path: APP_ROUTES.CreateCodec,
    element: <CodecCreatePage />,
  },
  {
    path: APP_ROUTES.EditCodec,
    element: <CodecEditPage />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
