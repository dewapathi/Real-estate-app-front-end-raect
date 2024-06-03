import HomePage from "./routes/homePage/HomePage";
import { Layout, RequireAuth } from "./routes/layout/Layout";
import ListPage from "./routes/listPage/ListPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import RegisterPage from "./routes/register/RegisterPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import LoginPage from "./routes/loginPage/LoginPage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/register",
          element: <RegisterPage />
        },
        {
          path: "/login",
          element: <LoginPage />
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />
        },
        {
          path: "/add",
          element: <NewPostPage />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
