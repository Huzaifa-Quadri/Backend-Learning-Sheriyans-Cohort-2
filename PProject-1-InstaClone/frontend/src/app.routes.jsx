import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Feed from "./features/posts/pages/Feed";

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
    element: <Feed />,
  },
]);
//now we have to provide this router to our main app.jsx file
//we can export it like this or add a export keyword before const router [line:6]
export default router;
