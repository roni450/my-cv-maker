import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Box, Spinner } from '@chakra-ui/react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CVForm from './pages/CVForm';

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <CVForm />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}