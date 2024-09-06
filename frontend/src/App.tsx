import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./components/Home"
import Login from "./components/Login"
import NotFound from "./components/NotFound"
const Logout=()=>{
  localStorage.clear()
  return <Navigate to="/login"/>
}

const Registerandlogout=()=>{
  localStorage.clear()
  return <Register/>
}
function App() {
  

  return (
    <> 
     <Router>
      <Routes>
         <Route path="/" element={
          <ProtectedRoute>
             <Home/>
          </ProtectedRoute>
         } />
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Registerandlogout/>}/>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
