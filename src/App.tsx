import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import { MyCourses } from "./pages/MyCourses";
import { CreateCourse } from "./pages/CreateCourse";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/courses",
    element: <MyCourses />
  },
  {
    path: "/courses/new",
    element: <CreateCourse />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
