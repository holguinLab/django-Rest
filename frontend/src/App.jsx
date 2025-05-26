
import { Routes, Route, Navigate } from 'react-router-dom';


import { Lista } from "./components/Lista"
import { Login } from "./components/Login"
import { Register } from "./components/Register"

import { useEffect ,useState } from 'react';



function App() {
  // Estado que indica si el usuario está logueado
  const [logueado, setLogueado] = useState(false);

  // Comprobar si hay token guardado al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogueado(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={logueado ? <Navigate to="/tareas" /> : <Login setLogueado={setLogueado} />} />
      <Route path="/register" element={logueado ? <Navigate to="/tareas" /> : <Register />} />
      <Route path="/tareas" element={logueado ? <Lista /> : <Navigate to='/' />} />
    </Routes>
  )
}

export default App
