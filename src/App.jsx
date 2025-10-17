import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext'; // Importe o hook useAuth
import LoginPage from './views/HomePage';
import CreateAccount from './views/CreateAccount';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth(); // Agora o useAuth() deve retornar o valor correto


  return (
    
    <>
    {user ?
    <Router>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
      </Routes>
    </Router>
    
    
    : <LoginPage />}
  </> 
  )
}
export default App
