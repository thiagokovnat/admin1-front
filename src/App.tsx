import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { MyCourses } from "./pages/MyCourses";
import { CreateCourse } from "./pages/CreateCourse";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import { AuthProvider } from "./auth/AuthContext";
import { CoursePage } from "./pages/CoursePage";
import { CreateTask } from "./pages/CreateTask";
import { AllCourses } from "./pages/AllCourses";
import { ViewCourse } from "./pages/ViewCourse";
import { UpdateTask } from "./pages/UpdateTask";

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
    element: <CreateCourse />,
  },
  {
    path: "/courses/:id",
    element: <CoursePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/tasks/new/:courseId/:lectureId",
    element: <CreateTask />,
  },
  {
    path: "/tasks/:courseId/:lectureId/:taskId",
    element: <UpdateTask />,
  },
  {
    path: "/courses/all",
    element: <AllCourses />,
  },
  {
    path: "/courses/:id/view",
    element: <ViewCourse />,
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
