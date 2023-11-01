import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { MyCourses } from "./pages/MyCourses";
import { CreateCourse } from "./pages/CreateCourse";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import { AuthProvider } from "./auth/AuthContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/courses",
    element: <MyCourses />,
  },
  {
    path: "/courses/new",
    element: <CreateCourse />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
