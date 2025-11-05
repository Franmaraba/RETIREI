import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, tipoPermitido }) {
  const { user, userData, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  // Se não estiver logado
  if (!user) return <Navigate to="/" replace />;

  // Se logado mas não do tipo certo → vai pro painel correto
  if (userData?.tipo !== tipoPermitido) {
    return userData?.tipo === "coletora" ? (
      <Navigate to="/painel-coletora"  />
    ) : (
      <Navigate to="/painel-usuario" />
    );
  }

  // Se tudo certo, mostra o conteúdo da rota
  return children;
}
