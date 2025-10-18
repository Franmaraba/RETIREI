import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext'; // Importe o hook useAuth
import './App.css'
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import CreateAccount from './views/CreateAccount';

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
    
    <Routes>
      {user ? (

        <>
      
          
            <Route index element={<LoginPage />} />
            
        </>  
        
    ) : (

        <>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<CreateAccount />} />
        </>

      )};

      </Routes>
    
  );
}
export default App
