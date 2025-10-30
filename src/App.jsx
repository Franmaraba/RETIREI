import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import CreateAccount from "./views/CreateAccount";
import PainelColetora from "./views/PainelColetora";
import PainelUsuario from "./views/PainelUsuario";
import SolicitacaoForm from "./views/SolicitacaoForm";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </>
      )}

      <Route
        path="/painel-usuario"
        element={
          <ProtectedRoute tipoPermitido="solicitante">
            <PainelUsuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/painel-coletora"
        element={
          <ProtectedRoute tipoPermitido="coletora">
            <PainelColetora />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solicitacao"
        element={
          <ProtectedRoute tipoPermitido="solicitante">
            <SolicitacaoForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
