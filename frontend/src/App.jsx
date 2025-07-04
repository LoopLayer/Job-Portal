// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loadUser } from "./redux/authSlice";

// Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';

// Router Setup
const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/job/description/:id', element: <JobDescription /> },
  { path: '/browse', element: <Browse /> },
  { path: '/profile', element: <Profile /> },
]);

function App() {
  const dispatch = useDispatch();

  // Auto-login on app refresh
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
}

export default App;
