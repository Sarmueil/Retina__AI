import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
