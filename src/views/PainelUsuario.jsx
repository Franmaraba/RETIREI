import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Header from "../componets/Header";
import "../global.css";
import MenuSolicitante from "../componets/MenuSolicitante";

function PainelUsuario() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [coletaEditando, setColetaEditando] = useState(null);

  useEffect(() => {
    const buscarColetas = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "coletas"),
          where("solicitanteId", "==", user.uid),
          where("status", "in", ["em andamento", "pendente"])
        );

        const querySnapshot = await getDocs(q);
        const lista = [];

        querySnapshot.forEach((docSnap) => {
          lista.push({ id: docSnap.id, ...docSnap.data() });
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

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta solicitação?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "coletas", id));

      setColetas((prev) => prev.filter((coleta) => coleta.id !== id));

      alert("Solicitação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir coleta:", error);
      alert("Erro ao excluir solicitação.");
    }
  };

  const handleSave = async () => {
    if (!coletaEditando) return;

    try {
      const coletaRef = doc(db, "coletas", coletaEditando);
      await updateDoc(coletaRef, {
        tipoLixo: tipo,
        quantidade: quantidade,
      });

      alert("Atualizado com sucesso!");

      setEditMode(false);

      setColetas((prev) =>
        prev.map((item) =>
          item.id === coletaEditando
            ? { ...item, tipoLixo: tipo, quantidade: quantidade }
            : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar coleta:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  const editarColeta = (coleta) => {
    setEditMode(true);
    setColetaEditando(coleta.id);
    setTipo(coleta.tipoLixo);
    setQuantidade(coleta.quantidade);
  };

  const pageTitle = "Painel Usuario";

  return (
    <>
      <Header pageTitle={pageTitle} />

      {loading ? (
        <p>Carregando...</p>
      ) : coletas.length === 0 ? (
        <p>Você ainda não fez nenhuma solicitação.</p>
      ) : (
        <>
          {editMode ? (
            <div>
              <h3>Editar solicitação</h3>
              <label>Tipo:</label>
              <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />

              <label>Quantidade:</label>
              <input
                type="text"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />

              <button onClick={handleSave}>Salvar</button>
              <button onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
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
                  <button className="button-editar" onClick={() => editarColeta(coleta)}>Editar</button>
                  <button className="button-excluir" onClick={() => handleDelete(coleta.id)}>Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <NavLink to="/solicitacao">
        <div className="floating-button">
          <span>
            <button className="button-request" >Nova solicitação</button>
          </span>
        </div>
      </NavLink>
    </>
  );
}

export default PainelUsuario;
