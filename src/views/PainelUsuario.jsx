import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Header from "../componets/Header";
import "../global.css";

function PainelUsuario() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const buscarColetas = async () => {
      try {
        const user = auth.currentUser;

        // Cria uma consulta para buscar coletas do usuário logado
        const q = query(
          collection(db, "coletas"),
          where("solicitanteId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const lista = [];

        querySnapshot.forEach((doc) => {
          lista.push({ id: doc.id, ...doc.data() });
        });

        setColetas(lista);
      } catch (error) {
        console.error("Erro ao buscar coletas:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarColetas();
  }, []);

  const pageTitle = "Painel Usuario";

  return (
    <>
      <Header pageTitle={pageTitle} />
      <h2>Minhas Solicitações de Coleta</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : coletas.length === 0 ? (
        <p>Você ainda não fez nenhuma solicitação.</p>
      ) : (
        <ul>
          {coletas.map((coleta) => (
            <li key={coleta.id}>
              <strong>Tipo:</strong> {coleta.tipoLixo} <br />
              <strong>Quantidade:</strong> {coleta.quantidade} <br />
              <strong>Status:</strong> {coleta.status} <br />
              <strong>Data:</strong>{" "}
              {coleta.dataSolicitacao?.toDate().toLocaleString()}
              <hr />
            </li>
          ))}
        </ul>
      )}
      <NavLink to="/solicitacao">
        <div className="floating-button">
          <span>+</span>
        </div>
      </NavLink>
    </>
  );
}

export default PainelUsuario;
