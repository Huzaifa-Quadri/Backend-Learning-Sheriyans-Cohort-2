import React from "react";
import { RouterProvider } from "react-router";
import router from "./app.routes";
import "./features/shared/global.scss";
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
