import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Student from './Student.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import StudentDetails from './StudentDetails.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AddSt from './addSt.jsx';           // keep as your file name
import EditStudent from './EditStudent.jsx'; // ✅ NEW

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/Student', element: <Student /> },
  { path: '/About', element: <About /> },
  { path: '/Contact', element: <Contact /> },
  { path: '/Student/:id', element: <StudentDetails /> },
  { path: '/AddSt', element: <AddSt /> },
  { path: '/Edit/:id', element: <EditStudent /> },
  { path: '/Login', element: <Login /> },
  { path: '/Register', element: <Register /> },
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
