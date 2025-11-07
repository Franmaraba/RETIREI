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
import MainPage from "./views/MainPage";
import PagePerfil from "./views/PagePerfil";
import ColetasAceitas from "./views/ColetasAceitas";
import HistoricoColetas from "./views/HistoricoColetas";
import PainelPrincipal from "./componets/PainelPrincipal";

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
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </>
      )}

      <Route
        path="/"
        element={
          <ProtectedRoute tipoPermitido={["solicitante", "coletora"]}>
            <PainelPrincipal />
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
      <Route
        path="/perfil"
        element={
          <ProtectedRoute tipoPermitido={["coletora", "solicitante"]}>
            <PagePerfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coletas-aceitas"
        element={
          <ProtectedRoute tipoPermitido="coletora">
            <ColetasAceitas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/historico-coletas"
        element={
          <ProtectedRoute tipoPermitido="coletora">
            <HistoricoColetas />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
