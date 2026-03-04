import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";
import Layout from "./features/shared/components/Layout";

//after creating router we have to export it
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "profile",
        element: <div>Profile Page WIP</div>,
      },
    ],
  },
]);
//now we have to provide this router to our main app.jsx file
//we can export it like this or add a export keyword before const router [line:6]
export default router;
