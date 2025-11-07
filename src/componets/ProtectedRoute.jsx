import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, tipoPermitido }) {
  const { user, userData, loading } = useAuth();

  // Enquanto os dados do usuário estão sendo carregados
  if (loading || !userData) return <p>Carregando...</p>;

  // Se não estiver logado
  if (!user) return <Navigate to="/" replace />;

  // Garante que tipoPermitido é sempre um array
  const tiposPermitidos = Array.isArray(tipoPermitido)
    ? tipoPermitido
    : [tipoPermitido];

  // Se o tipo do usuário não é permitido nesta rota
  if (!tiposPermitidos.includes(userData.tipo)) {
    // 🔁 Redireciona para a página principal após login
    return <Navigate to="/" replace />;
  }

  // Se tudo certo, mostra o conteúdo da rota
  return children;
}
